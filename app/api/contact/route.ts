import { NextRequest, NextResponse } from 'next/server';
import { submitContactMessage } from '@/lib/supabase/data-service';

// Basic in-memory rate limiter per IP: max 5 requests per 10 minutes
const ipRateMap = new Map<string, { count: number; expiresAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local';
    const now = Date.now();

    // Check rate limit
    const existing = ipRateMap.get(ip);
    if (existing && existing.expiresAt > now) {
      if (existing.count >= 5) {
        return NextResponse.json(
          { error: 'Too many submissions. Please wait a few minutes or reach out on LinkedIn.' },
          { status: 429 }
        );
      }
      existing.count += 1;
    } else {
      ipRateMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    }

    const body = await req.json();
    const { name, email, subject, message, botField } = body;

    // Honeypot check
    if (botField) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Save to Supabase (if connected)
    await submitContactMessage({
      senderName: name,
      senderEmail: email,
      subject: subject || 'Portfolio Inquiry',
      message,
    });

    // If Resend API Key is set, deliver email notification
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

    if (resendKey && notifyEmail && !notifyEmail.includes('[PLACEHOLDER')) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Inquiry <onboarding@resend.dev>',
            to: [notifyEmail],
            subject: `Portfolio Inquiry: ${subject || name}`,
            text: `From: ${name} (${email})\n\nMessage:\n${message}`,
          }),
        });
      } catch (emailErr) {
        console.warn('Failed to forward email via Resend:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
