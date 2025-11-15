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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_analysis: {
        Row: {
          analysis_date: string | null
          created_at: string | null
          detected_emotions: string[] | null
          id: string
          key_topics: string[] | null
          log_id: string | null
          recommendations: string | null
          risk_level: string | null
          sentiment_score: number | null
          user_id: string
        }
        Insert: {
          analysis_date?: string | null
          created_at?: string | null
          detected_emotions?: string[] | null
          id?: string
          key_topics?: string[] | null
          log_id?: string | null
          recommendations?: string | null
          risk_level?: string | null
          sentiment_score?: number | null
          user_id: string
        }
        Update: {
          analysis_date?: string | null
          created_at?: string | null
          detected_emotions?: string[] | null
          id?: string
          key_topics?: string[] | null
          log_id?: string | null
          recommendations?: string | null
          risk_level?: string | null
          sentiment_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_analysis_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "daily_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      counsellors: {
        Row: {
          active_sessions: number | null
          availability: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          rating: number | null
          specialization: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active_sessions?: number | null
          availability?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          rating?: number | null
          specialization: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active_sessions?: number | null
          availability?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          rating?: number | null
          specialization?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      crisis_alerts: {
        Row: {
          alert_type: string
          counsellor_contacted: string | null
          created_at: string | null
          description: string | null
          id: string
          resolved_at: string | null
          severity: string
          status: string | null
          user_id: string
        }
        Insert: {
          alert_type: string
          counsellor_contacted?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          resolved_at?: string | null
          severity: string
          status?: string | null
          user_id: string
        }
        Update: {
          alert_type?: string
          counsellor_contacted?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          resolved_at?: string | null
          severity?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crisis_alerts_counsellor_contacted_fkey"
            columns: ["counsellor_contacted"]
            isOneToOne: false
            referencedRelation: "counsellors"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_logs: {
        Row: {
          created_at: string | null
          id: string
          log_date: string
          mood: string
          notes: string | null
          sleep_hours: number | null
          stress_level: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          log_date?: string
          mood: string
          notes?: string | null
          sleep_hours?: number | null
          stress_level: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          log_date?: string
          mood?: string
          notes?: string | null
          sleep_hours?: number | null
          stress_level?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      emergency_contacts: {
        Row: {
          country: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone: string
        }
        Update: {
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comments: string | null
          counsellor_id: string | null
          created_at: string | null
          id: string
          rating: number | null
          session_id: string
          user_id: string
        }
        Insert: {
          comments?: string | null
          counsellor_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          session_id: string
          user_id: string
        }
        Update: {
          comments?: string | null
          counsellor_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_counsellor_id_fkey"
            columns: ["counsellor_id"]
            isOneToOne: false
            referencedRelation: "counsellors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          assessment_date: string
          created_at: string | null
          emotional_stability_score: number | null
          id: string
          improvement_notes: string | null
          user_id: string
        }
        Insert: {
          assessment_date?: string
          created_at?: string | null
          emotional_stability_score?: number | null
          id?: string
          improvement_notes?: string | null
          user_id: string
        }
        Update: {
          assessment_date?: string
          created_at?: string | null
          emotional_stability_score?: number | null
          id?: string
          improvement_notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          priority: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          priority?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          priority?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          counsellor_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          session_date: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          counsellor_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          session_date: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          counsellor_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          session_date?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_counsellor_id_fkey"
            columns: ["counsellor_id"]
            isOneToOne: false
            referencedRelation: "counsellors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
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
      app_role: "admin" | "counsellor" | "user" | "data_scientist"
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
      app_role: ["admin", "counsellor", "user", "data_scientist"],
    },
  },
} as const
