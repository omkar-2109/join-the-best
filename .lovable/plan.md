

# Candidate Signup: Two-Phase Flow with Email Verification

## Overview

Restructure the signup process into two distinct phases:
1. **Phase 1 (SignUp page)**: Register with email + password only, then verify email
2. **Phase 2 (Profile completion page)**: After email verification and login, fill in detailed candidate profile

This ensures verified users before collecting detailed personal information.

---

## Changes

### 1. Database Migration -- Add new columns to `candidate_profiles`

Add columns to support the new fields requested:
- `alt_phone` (text) -- alternate contact number
- `dob` (text) -- date of birth
- `pincode` (text) -- location pincode
- `additional_courses` (text) -- additional certifications/courses
- `field_of_work` (text) -- which field they work in
- `hr_name` (text) -- company HR name (for experienced)

The existing columns cover: name, email, phone, location (preferred_locations), qualification, work_history (JSONB for multiple experiences with HR details), resume_file_name, preferred_roles, skills.

### 2. Disable Auto-Confirm Emails

Use the configure-auth tool to ensure email confirmation is required (users must verify their email before signing in).

### 3. Rewrite `SignUp.tsx` -- Simplified Registration

Strip the current 3-step form down to just:
- Full Name
- Email
- Password
- Confirm Password

On submit:
- Call `signUp(email, password)`
- Show success message: "Check your email to verify your account"
- Redirect to `/login`

No profile data collection at this stage.

### 4. New Page: `CompleteProfile.tsx`

A new route `/complete-profile` shown to logged-in users who have no `candidate_profiles` record yet.

**Form fields (single scrollable page):**
- Full Name (pre-filled from signup if available)
- Contact No (required)
- Alternate No (optional)
- Email (pre-filled, read-only)
- Date of Birth (date picker)
- Location (text)
- Pincode (text)
- Highest Qualification (dropdown: 10th, 12th, Diploma, Graduate, Post Graduate, PhD)
- Additional Courses (text)
- Professional Experience toggle (Fresher / Experienced)
  - If Experienced:
    - Which Field (text)
    - Company Name, HR Name, HR No (per entry)
    - "Add More Experience" button for multiple entries
  - If Fresher: no extra fields
- CV Upload (file input, .pdf/.doc/.docx)
- Interested Job Roles: multi-select dropdown with predefined options + "Other" free-text input
  - Options: Software Developer, Data Analyst, Marketing, Sales, HR, Operations, Finance, Customer Support, Design, Content Writing, etc.

**On submit**: Insert into `candidate_profiles` table, upload resume to storage bucket, redirect to `/seeker-dashboard`.

### 5. Update Routing in `App.tsx`

Add route: `/complete-profile` mapped to `CompleteProfile.tsx`.

### 6. Update `SeekerDashboard.tsx` -- Profile Gate

If a logged-in user has no `candidateProfileId`, redirect them to `/complete-profile` instead of showing an incomplete dashboard.

### 7. Update `Login.tsx` -- Post-Login Redirect

After successful login, check if the user has a candidate profile:
- If yes: navigate to `/seeker-dashboard`
- If no: navigate to `/complete-profile`

### 8. Update `useAuth.tsx`

The existing `candidateProfileId` check already works. The dashboard and login pages will use this to decide where to redirect.

---

## Technical Notes

- The "Interested Job Roles" multi-select will use a custom component with checkboxes inside a Popover, plus an "Other" text input that appends to the selection
- Work history entries stored as JSONB array in the existing `work_history` column, now including `hr_name` and `field_of_work`
- The `candidate_profiles` table gets 4 new nullable text columns via migration
- Email verification is enforced by disabling auto-confirm in auth settings

