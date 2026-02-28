import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const fallbackUrl = "https://ephdptbfeougkeupzdet.supabase.co";
const fallbackAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaGRwdGJmZW91Z2tldXB6ZGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxODYzMTksImV4cCI6MjA4Nzc2MjMxOX0.DC2GCCv9lzCoQ4ro9bdilDvkV3h5A0Bff7_JgrNLdc";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || fallbackUrl;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || fallbackAnonKey;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
