# Portfolio Placeholders Checklist for Shivkanya Byale

Before making your portfolio public, review and fill in the following placeholder fields. All items below are currently marked with `[PLACEHOLDER]` across the database and codebase.

---

## 1. Profile & Contact Placeholders
- [ ] **Contact Email Address**:
  - *Current Value*: `[PLACEHOLDER]`
  - *Where to update*: Admin Panel (`/admin` -> Profile & Resumes -> Contact Email) or Supabase `profiles.email`
  - *Target*: Your active professional email address (e.g., `shivkanya.byale@gmail.com`)
- [ ] **Currently Learning / Building**:
  - *Current Value*: `[PLACEHOLDER: Microsoft Fabric & Copilot Studio]`
  - *Where to update*: Admin Panel (`/admin` -> Profile & Resumes -> Currently Learning) or Supabase `profiles.currently_learning`
  - *Suggestions*: E.g., `Microsoft Fabric Lakehouse architectures & Copilot Studio enterprise agents`

---

## 2. Professional Experience Placeholders
- [ ] **Techknomatic Services Pvt Ltd (2026 – Present)**:
  - *Current Value*: `[PLACEHOLDER: time saved / number of bots]`
  - *Where to update*: Admin Panel (`/admin` -> Experience -> Edit Techknomatic entry) or Supabase `experience.highlights`
  - *Suggestions*: E.g., *"Engineered 8+ enterprise RPA bots saving ~25 hours of manual operational effort per week across banking client workflows."* (Use only your verified metrics)

---

## 3. Case Studies & Projects Placeholders
- [ ] **Banking Process Automation (RPA)** (Seeded as **DRAFT** so it remains hidden until filled):
  - *Status*: `draft` (Private preview accessible at `/projects/banking-process-automation-rpa?preview=true`)
  - *Fields to complete before publishing*:
    1. **The Business Challenge (Problem)**:
       - *Current Value*: `[PLACEHOLDER: Detailed description of the specific manual operational bottlenecks, core banking extraction hurdles, and reconciliation time constraints]`
    2. **The Solution & Architecture**:
       - *Current Value*: `[PLACEHOLDER: Detailed architecture of the Power Automate Desktop extraction sequence, Python transformation scripts, batch scheduling, and condition-based email dispatch]`
    3. **Key Features Bullet**:
       - *Current Value*: `[PLACEHOLDER: additional automation feature]`
    4. **My Role & Responsibilities Bullet**:
       - *Current Value*: `[PLACEHOLDER: additional responsibilities]`
    5. **Outcome & Impact Metrics**:
       - *Current Values*:
         - `[PLACEHOLDER: Quantified metric, e.g. hours saved per week or percentage reduction in turnaround time]`
         - `[PLACEHOLDER: Quantified volume, e.g. number of daily transactions or reports processed]`
         - `[PLACEHOLDER: Accuracy improvement or SLA metric]`
    6. **Publish Toggle**: Change status from `draft` to `published` once ready!

---

## 4. Credentials & Document Files
- [ ] **DP-600 Credential Verification URL**:
  - *Current Value*: `https://learn.microsoft.com/en-us/users/shivkanyabyale/credentials`
  - *Where to update*: Admin Panel (`/admin` -> Certifications)
  - *Target*: Exact Microsoft Learn Credential share URL
- [ ] **Resume PDF Files**:
  - *Current Value*: `/resume.pdf` (default template)
  - *Where to update*: Upload your tailored PDF versions to Supabase Storage bucket `resumes` and update links in `/admin` -> Profile & Resumes:
    1. Power BI Specialist Focus PDF
    2. Power Platform & RPA Focus PDF
    3. Business Analyst & Consulting Focus PDF
    4. Complete Comprehensive CV PDF
