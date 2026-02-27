

# Fix DOB Picker: Add Year/Month Dropdowns

## Problem
The current date picker only allows navigating month-by-month using arrows, making it very tedious to select a birth year (e.g., scrolling back 20+ years).

## Solution
Replace the basic `Calendar` component for DOB with a custom date picker that includes **year and month dropdown selectors** at the top, allowing users to jump directly to any year/month.

## Changes

### 1. Update `src/pages/CompleteProfile.tsx`
- Replace the simple `<Calendar>` with a `<Calendar>` that uses `captionLayout="dropdown-buttons"` and `fromYear={1950}` / `toYear={2026}` props (supported by `react-day-picker` v8).
- This renders native dropdowns for month and year in the calendar header, letting users pick any year instantly.
- Add custom classNames for the dropdown elements (`caption_dropdowns`, `vhidden`) to style them properly.

### Technical Detail
The `react-day-picker` library (v8) already supports `captionLayout="dropdown-buttons"` which combines dropdown selectors with navigation buttons. We just need to pass:
```tsx
<Calendar
  mode="single"
  captionLayout="dropdown-buttons"
  fromYear={1950}
  toYear={2026}
  selected={dob}
  onSelect={setDob}
  disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
  initialFocus
/>
```

And add minimal CSS for the dropdown styling in the calendar classNames.

