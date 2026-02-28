

# Enhance Education Section with Course, Passout Year & College Fields

## Problem
The education section currently only has "Highest Qualification" dropdown and "Additional Courses" text input. Users need to provide more details like their course/stream name, passout year, and college/institute name.

## Changes

### Update `src/pages/CompleteProfile.tsx`

**Add new state variables:**
- `courseName` (string) -- e.g., "B.Tech Computer Science", "MBA Finance"
- `passingYear` (string) -- selected from a dropdown of years
- `collegeName` (string) -- text input for institute name

**Update the Education card UI** to include after the qualification dropdown:
1. **Course / Stream** -- text input (e.g., "B.Tech CS", "BCom", "Diploma in Mechanical")
2. **Passout Year** -- dropdown select from 1980 to current year
3. **College / Institute Name** -- text input

Layout: Course and Passout Year side by side in a 2-column grid, College full width below.

**Update the `handleSubmit` function** to include the new fields in the database insert:
- Map `courseName` to `additional_courses` (or keep separate -- the DB already has `passing_year` and `qualification` columns)
- Map `passingYear` to `passing_year` column (already exists in DB)
- For college name, we can store it alongside `additional_courses` or use an existing field

Since the database already has `passing_year` and `additional_courses` columns, we'll:
- Use `passing_year` for the passout year
- Rename the current `additionalCourses` state to store the college name, and add a separate course/stream field that gets saved into `additional_courses` along with the college info
- Actually, cleaner approach: use `additional_courses` for the course/stream name, and add a new DB column for `college_name`

### Database Migration
Add a `college_name` column to `candidate_profiles`:
```sql
ALTER TABLE candidate_profiles ADD COLUMN college_name text DEFAULT '';
```

### Summary of field mapping:
| UI Field | DB Column | Status |
|---|---|---|
| Highest Qualification | `qualification` | Exists |
| Course / Stream | `additional_courses` | Exists (repurpose) |
| Passout Year | `passing_year` | Exists |
| College / Institute | `college_name` | New column |
| Additional Certifications | Keep as separate input | Needs new state |

### Revised approach (simpler, no DB change needed):
Since `additional_courses` is currently used for certifications, we can store course/stream info differently. Looking at the DB, we have:
- `qualification` -- for highest qualification level
- `passing_year` -- for passout year (already exists, currently unused in form)
- `additional_courses` -- for additional courses/certifications

We just need to add the **course/stream input** and **college name** and **passout year** to the form. We can concatenate course + college into `additional_courses` or add a DB column.

**Final plan -- add one DB column (`college_name`) and wire up existing `passing_year`:**

1. **DB Migration**: Add `college_name text DEFAULT ''` to `candidate_profiles`
2. **New state**: `courseName`, `passingYear`, `collegeName`
3. **UI**: Expand Education card with 3 new fields
4. **Submit**: Map `courseName` to `additional_courses`, `passingYear` to `passing_year`, `collegeName` to `college_name`
5. Keep the existing "Additional Courses / Certifications" input as a separate field below

