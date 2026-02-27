# BBS Platform Pivot: Anonymous Recruitment Model

## Overview

Transform the current traditional job board into an **anonymous, platform-mediated recruitment system** where BBS acts as the intermediary between candidates and hidden partner companies. This is a fundamental architectural change affecting almost every page.

---

## Core Concept

```text
Candidate --> BBS Platform --> Internal Recruiter --> Partner Companies (off-platform)
```

- Candidates never see company names, logos, or details
- BBS internally matches and forwards candidates to partners
- Status updates flow back through the platform team

---

## What Changes

### 1. Data Layer (`src/data/sampleData.ts`) -- Complete Rewrite

**Remove**: `Company` interface and `sampleCompanies` array (candidates never see companies)

**Modify `Job` interface** -- strip company info:

- Remove: `company`, `companyLogo`
- Add: `urgency` ("Urgent" | "Normal"), `internalCompanyIds` (admin-only hidden mapping)

**New `CandidateProfile` interface** (registration data):

- Name, email, phone, resume, experience years, preferred locations, preferred roles
- Experience type: "fresher" | "experienced" | "career-break"
- Work history entries (with HR contact details for verification)
- Education, skills

**New `CandidateApplication` interface**:

- Status timeline: Applied > Profile Shortlisted > Submitted to Partner > Interview Scheduled > Offer / Rejected / On Hold
- Internal notes (admin-only), verification status

**Update `testimonials**` -- remove company references, use generic candidate success stories

**Update `stats**` -- change "Companies" to "Placements" or "Hiring Partners"

### 2. Remove Pages

- **Companies page** (`/companies`) -- no company browsing
- **Company Profile page** (`/company/:id`) -- no company visibility
- **Candidate Profile page** (`/candidate/:id`) -- replaced by candidate's own profile/settings

### 3. Landing Page (`Index.tsx`) -- Major Redesign

- Hero: "Your Career, Our Priority" -- emphasize platform-managed hiring
- Remove "Trusted by" company logos section entirely
- Stats: "50K+ Candidates Placed", "500+ Hiring Partners", "95% Satisfaction"
- "How It Works" for candidates only (Register > Browse Roles > Apply via Platform > Track Status)
- Featured Roles section: job cards WITHOUT company names/logos
- Testimonials: candidate-only success stories (no company mentions)
- Remove "Post a Job" CTA (recruiters are internal team, not public)
- CTA: "Register & Start Applying"

### 4. Navigation (`Navbar.tsx`)

**Change links to:**

- "Browse Roles" (was "Find Jobs")
- "About" (stays)
- Remove: "Companies", "For Recruiters"
- Add: "My Dashboard" (visible when logged in, links to candidate dashboard)

**Auth buttons**: "Login" / "Register"

**Admin access**: Separate `/admin` route, not in public nav

### 5. Job Listings Page (`/jobs`) -- Anonymized

- Header: "Browse Open Roles"
- Job cards show ONLY: Role title, Location(s), Salary Range, Experience Range, Employment Type, Urgency tag
- NO company name, NO company logo
- Filters: Role, Location, Salary range, Experience level
- CTA on each card: "Apply via Platform"

### 6. Job Detail Page (`/jobs/:id`) -- Anonymized

- Show: Role title, responsibilities, required skills, salary range, locations (selectable), urgency tag
- Remove: Company sidebar, company overview card
- CTA: "Apply via Platform"
- Message: "Your application will be submitted to relevant hiring partners by our team."
- Remove "Related Jobs from this Company" -- replace with "Similar Roles"

### 7. Candidate Registration/Signup (`/signup`) -- Enhanced

Multi-step registration form:

- **Step 1**: Basic info (name, email, phone, password, role selection removed -- candidates only)
- **Step 2**: Experience type selection (Fresher / Experienced / Career Break)
  - Fresher: qualification, passing year, internship (optional), skills, resume upload
  - Experienced: company entries with HR contact (name, email, phone/LinkedIn), start/end dates, job title. "Add another employer" button
  - Career Break: last company, last working date, gap reason dropdown, resume upload
- **Step 3**: Preferences (preferred roles, preferred locations, salary expectations)

### 8. Candidate Dashboard (`/seeker-dashboard`) -- Redesigned

- Profile completion progress bar
- **Application Status Tracker**: Each application shows status timeline
  - Applied > Profile Shortlisted > Submitted to Hiring Partner > Interview Scheduled > Offer / Rejected / On Hold
  - NO company name shown at any stage
- Recommended roles (anonymized)
- Saved roles list
- Edit profile section

### 9. Admin/Recruiter Dashboard (`/admin/dashboard`) -- Internal Only

New route (not in public nav). Overview cards:

- Active Roles, Total Applications, Pending Verifications, Submissions to Partners, Interviews, Placements

### 10. Admin Pipeline (`/admin/pipeline`) -- Replaces ATS

- Candidates grouped by role and location
- Zebra-striped table: Candidate name, resume link, experience, verification status badge, internal notes, status
- Actions: Match to partner, update status, add notes
- Verification badges: Yellow (Pending), Green (Verified)
- Status updates sync to candidate dashboard

### 11. Admin Role Management (`/admin/roles`) -- New Page

- Create/edit job roles: title, description, skills, salary range, locations, experience range, active/paused toggle
- Internal-only: link roles to partner companies (hidden mapping)

### 12. Login Page (`/login`) -- Minor Update

- Remove role selection (candidates only on public side)
- Add separate admin login link or `/admin/login` route

### 13. About Page -- Update

- Remove "team bios" that reference recruiting for companies
- Emphasize BBS as a managed hiring platform
- Keep contact form and social links

### 14. Footer -- Update

- Remove "Companies" and "For Recruiters" links
- Add "Candidate Resources", "How It Works", "Privacy Policy"

### 15. Job Fair Feature (Optional -- included as UI placeholder)

- Admin can create a "Job Fair" event (title, roles, dates, active toggle)
- When active: global banner/popup on landing page with "Register & Apply" CTA

---

## New File Structure

```text
src/
  data/
    sampleData.ts          -- Rewritten: anonymized jobs, candidate profiles, applications
  pages/
    Index.tsx              -- Redesigned landing
    JobListings.tsx        -- Anonymized role browsing
    JobDetail.tsx          -- Anonymized role detail
    SignUp.tsx             -- Multi-step candidate registration
    Login.tsx              -- Simplified login
    SeekerDashboard.tsx    -- Candidate application tracker
    About.tsx              -- Updated
    admin/
      AdminDashboard.tsx   -- Internal recruiter overview
      AdminPipeline.tsx    -- Candidate pipeline management
      AdminRoles.tsx       -- Role creation/management
    NotFound.tsx           -- Stays
  components/
    layout/
      Navbar.tsx           -- Updated nav links
      Footer.tsx           -- Updated footer links
      Layout.tsx           -- Stays
      AdminLayout.tsx      -- New: sidebar layout for admin pages
```

**Removed files**: `Companies.tsx`, `CompanyProfile.tsx`, `CandidateProfile.tsx`, `ATS.tsx`, `RecruiterDashboard.tsx`

---

## Technical Details

- Multi-step signup uses local state with tabs/steps (no backend yet)
- Experience verification fields are conditional based on experience type selection
- Admin pages use a separate `AdminLayout` with sidebar navigation
- All company references stripped from candidate-visible interfaces and components
- Job Fair banner uses a simple state toggle on the landing page
- Zebra-striped tables use `even:bg-secondary` Tailwind classes
- Verification badges use colored Badge components (yellow/green)

---

## Summary

This transforms BBS from a traditional two-sided job board into an **anonymous, platform-mediated hiring funnel** with:

- 3 candidate-facing pages (Browse Roles, Role Detail, Dashboard + Registration)
- 3 admin-facing pages (Dashboard, Pipeline, Role Management)
- Updated Landing, About, Login, and Signup pages
- Complete anonymity enforcement -- no company data in candidate-visible UI
- Multi-step registration with experience verification fields
- Job Fair banner placeholder
- now remove sample date and create an admin dashboard from where they can add the job roles and see the candidate information also