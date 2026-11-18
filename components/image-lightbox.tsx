'use client';

import * as React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
}

export function ImageLightbox({ images }: ImageLightboxProps) {
  const [activeImage, setActiveImage] = React.useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveImage(img)}
            className="group relative aspect-video rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer shadow-xs hover:border-brand-500/50 transition-all"
          >
            <img
              src={img}
              alt={`Project Screenshot ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <ZoomIn className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage}
            alt="Enlarged screenshot"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
