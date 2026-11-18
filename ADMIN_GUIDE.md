# How to Manage Content from the Admin Panel

The **Shivkanya Byale Portfolio Content Management System (CMS)** gives you complete, code-free control over your case studies, certifications, skills, resume files, and profile copy.

---

## 1. Accessing the Admin Panel
- **URL**: Navigate to `/admin` in your browser (e.g. `https://yourdomain.com/admin` or `http://localhost:3000/admin`).
- **Security Notice**: This route is strictly private and hidden from public search engines (`noindex, nofollow`). There are no links to it in the public navigation.
- **Authentication**:
  - Sign in using your registered Supabase Admin Email and Password.
  - In local offline development (without Supabase keys), click **"Sign In to Admin"** to access the developer preview session.

---

## 2. Managing Projects & Case Studies (`/admin` -> Projects)

### Adding a New Case Study:
1. Click **"+ New Project"** in the top right.
2. Enter the **Title** (e.g., *Multi-Entity Consolidated Finance Analytics*). The **URL Slug** will automatically generate (e.g., `multi-entity-consolidated-finance-analytics`), but you can customize it if needed.
3. Select the **Domain** (e.g., *Finance*, *Quick-Commerce / Logistics*, *Banking*, *Procurement & Supply Chain*).
4. Fill in the **One-line Summary**, **Overview**, **Problem**, and **Solution**.
5. Add structured bullet points:
   - **Key Features**: Click *Add Feature Bullet* for each feature.
   - **My Role & Responsibilities**: Detail your specific contributions.
   - **Outcome & Impact**: Add quantified metrics or verified facts. *(Note: If left empty, this section is automatically hidden on the public site!)*
6. Add **Tech Stack Tags**: Type a technology (e.g., `Power BI`, `DAX`, `Python`) and press Enter or click *Add*.
7. Optional **Live Demo URL**: Paste a link or embed URL to an interactive dashboard. *(Ensure this uses public sample data only, never client data!)*
8. Set the **Status**:
   - `Draft`: Project is saved but hidden from the public site.
   - `Published`: Project is immediately visible in the public projects grid.
9. Toggle **Featured**: Flag high-impact flagship case studies to display a prominent *Featured* badge on the card.
10. Click **"Save Case Study"**.

### Private Draft Previews:
- Before publishing a draft project, click the **"Live Draft Preview"** link or open `/projects/[slug]?preview=true`.
- This lets you review the complete 10-section case study page in your browser exactly as visitors will see it, while keeping it hidden from the public grid.

---

## 3. Managing Profile & Multi-Version Resumes (`/admin` -> Profile & Resumes)

### Updating Biographical Copy:
- **Headline**: Update your primary consulting title (e.g., *Power BI Developer | Power Platform Developer | Microsoft Fabric Consultant*).
- **One-line Value Statement**: The core hook displayed under your name.
- **About Paragraphs 1 & 2**: Concise, first-person narrative highlighting your cross-domain journey and data modeling anchor.
- **Currently Learning / Building Strip**: Update your current focus area (e.g., *Microsoft Fabric Lakehouse pipelines & Copilot Studio agents*).
- **Contact Details**: Update your email address, LinkedIn profile URL, and location.

### Multi-Version Resume Downloads:
When recruiters or clients click **"Download Resume"** in the Hero section, an interactive dropdown appears displaying your available tailored CV versions.
- In the **Multi-Version Resumes** card, you can:
  - Add new resume versions (e.g., *Power BI Focus*, *Power Platform & RPA Focus*, *Business Analyst Focus*, *Complete CV*).
  - Specify the PDF file URL (either a local path `/resume.pdf` or a public Supabase Storage URL).
  - Delete or reorder versions.

---

## 4. Managing Key Numbers Strip (`/admin` -> Key Numbers)
The key numbers strip directly below the hero section is strictly reserved for verified facts:
1. `3+` | *Years Experience*
2. `5+` | *Entities Consolidated in One Finance Solution*
3. `10+` | *Finance Reports Unified*
4. `DP-600` | *Microsoft Fabric Certified*

Use this tab to adjust labels or values as your experience and entity consolidation numbers expand.

---

## 5. Managing Certifications & Education (`/admin` -> Certifications)
- Click **"+ Add Certification"** to register new credentials.
- Enter the **Certification Name** (e.g., *Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)*), **Issuer** (*Microsoft*), **Issue Year** (*2024*), and your **Microsoft Learn Credential Verification URL**.
- Toggle *Published / Hidden* to control visibility.

---

## 6. Managing Skills & Project Filter Links (`/admin` -> Skills & Tools)
- Skills are grouped into clean enterprise categories:
  - *Business Intelligence*
  - *Power Platform*
  - *Data Engineering*
  - *Data Modeling*
  - *Programming & Tools*
  - *Business Analysis*
- Each skill chip is dynamically linked to projects! When visitors click any skill (e.g., **DAX** or **Power Automate**), the site automatically filters the Projects section to highlight case studies utilizing that skill.
- Use this tab to add or remove individual skill chips from any group.

---

## 7. Managing Testimonials (`/admin` -> Testimonials)
- **Important**: To protect your professional brand, the Testimonials section on the public site **remains completely hidden** until at least one published testimonial exists in the database.
- Once you receive verified endorsements from colleagues or clients, add them here and toggle their status to `Published`.
