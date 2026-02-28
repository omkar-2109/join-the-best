export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applied_at: string
          candidate_id: string
          id: string
          internal_notes: string
          job_id: string
          location_preference: string
          notes: string
          status: string
          updated_at: string
        }
        Insert: {
          applied_at?: string
          candidate_id: string
          id?: string
          internal_notes?: string
          job_id: string
          location_preference?: string
          notes?: string
          status?: string
          updated_at?: string
        }
        Update: {
          applied_at?: string
          candidate_id?: string
          id?: string
          internal_notes?: string
          job_id?: string
          location_preference?: string
          notes?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_profiles: {
        Row: {
          additional_courses: string | null
          alt_phone: string | null
          college_name: string | null
          created_at: string
          dob: string | null
          email: string
          experience_type: string
          experience_years: number
          field_of_work: string | null
          gap_reason: string | null
          hr_name: string | null
          id: string
          internship_experience: string | null
          last_company: string | null
          last_working_date: string | null
          name: string
          passing_year: string | null
          phone: string
          pincode: string | null
          preferred_locations: string[]
          preferred_roles: string[]
          qualification: string | null
          resume_file_name: string
          salary_expectation: string
          skills: string[]
          updated_at: string
          user_id: string
          verification_status: string
          work_history: Json | null
        }
        Insert: {
          additional_courses?: string | null
          alt_phone?: string | null
          college_name?: string | null
          created_at?: string
          dob?: string | null
          email: string
          experience_type?: string
          experience_years?: number
          field_of_work?: string | null
          gap_reason?: string | null
          hr_name?: string | null
          id?: string
          internship_experience?: string | null
          last_company?: string | null
          last_working_date?: string | null
          name: string
          passing_year?: string | null
          phone?: string
          pincode?: string | null
          preferred_locations?: string[]
          preferred_roles?: string[]
          qualification?: string | null
          resume_file_name?: string
          salary_expectation?: string
          skills?: string[]
          updated_at?: string
          user_id: string
          verification_status?: string
          work_history?: Json | null
        }
        Update: {
          additional_courses?: string | null
          alt_phone?: string | null
          college_name?: string | null
          created_at?: string
          dob?: string | null
          email?: string
          experience_type?: string
          experience_years?: number
          field_of_work?: string | null
          gap_reason?: string | null
          hr_name?: string | null
          id?: string
          internship_experience?: string | null
          last_company?: string | null
          last_working_date?: string | null
          name?: string
          passing_year?: string | null
          phone?: string
          pincode?: string | null
          preferred_locations?: string[]
          preferred_roles?: string[]
          qualification?: string | null
          resume_file_name?: string
          salary_expectation?: string
          skills?: string[]
          updated_at?: string
          user_id?: string
          verification_status?: string
          work_history?: Json | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          active: boolean
          created_at: string
          description: string
          experience_range: string
          id: string
          internal_company_ids: string[]
          locations: string[]
          requirements: string[]
          responsibilities: string[]
          salary_range: string
          skills: string[]
          title: string
          type: string
          updated_at: string
          urgency: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string
          experience_range?: string
          id?: string
          internal_company_ids?: string[]
          locations?: string[]
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string
          skills?: string[]
          title: string
          type?: string
          updated_at?: string
          urgency?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          experience_range?: string
          id?: string
          internal_company_ids?: string[]
          locations?: string[]
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string
          skills?: string[]
          title?: string
          type?: string
          updated_at?: string
          urgency?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
