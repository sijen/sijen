# Personal Portfolio Conversion TODO

**Approved Plan: Convert XDR dashboard to Sijen's personal portfolio site.**

## Steps (from approved plan):

### 1. Create src/data/portfolio.ts with personal data [COMPLETE]
   - Bio, work experience, Leo club roles/achievements, volunteering.
   - Projects, certifications (TBD).

### 2. Update src/components/layout/Sidebar.tsx [COMPLETE]
   - Personal nav: Home (/), Projects (/projects), Leo Club (/leo), Certifications (/certs), Experience (/experience), Contact (/contact).
   - Header: Use logo.png, "Sijen's Portfolio".

### 3. Update src/components/layout/Topbar.tsx [COMPLETE]
   - Personal title/logo, search for projects/experience.

### 4. Update src/pages/Dashboard/index.tsx → Home [PENDING]
   - Hero bio.
   - Stats: Leo roles, volunteer hours/projects.
   - Live feed → Recent Leo activities/projects.
   - Timeline → Leo club journey/work experience.

### 5. Update src/App.tsx [PENDING]
   - Route / → Dashboard (home).
   - Add stubs/routes for /projects (Alerts), /leo, /experience (Logs), /contact (Login), /skills (IPTracker).

### 6. Edit src/data/xdr.ts [PENDING]
   - Export portfolio data or deprecate XDR.

### 7. Minor: index.html title, theme tweaks [PENDING]

### 8. Test & Next [PENDING]
   - `npm run dev`
   - Repurpose other pages.
   - Add CV download.

**Progress: Steps 1-4 complete. Updated Dashboard to personal home with bio, Leo activities, experience. Sidebar/Topbar humanized. Routes updated for / (home), /projects, /skills, /experience, /contact.**

