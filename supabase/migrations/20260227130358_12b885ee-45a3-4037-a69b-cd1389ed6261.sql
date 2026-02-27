ALTER TABLE public.candidate_profiles 
  ADD COLUMN IF NOT EXISTS alt_phone text DEFAULT '',
  ADD COLUMN IF NOT EXISTS dob text DEFAULT '',
  ADD COLUMN IF NOT EXISTS pincode text DEFAULT '',
  ADD COLUMN IF NOT EXISTS additional_courses text DEFAULT '',
  ADD COLUMN IF NOT EXISTS field_of_work text DEFAULT '',
  ADD COLUMN IF NOT EXISTS hr_name text DEFAULT '';