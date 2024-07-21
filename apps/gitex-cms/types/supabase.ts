
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assist_prompts: {
        Row: {
          created_at: string
          id: number
          prompt: string
        }
        Insert: {
          created_at?: string
          id?: number
          prompt?: string
        }
        Update: {
          created_at?: string
          id?: number
          prompt?: string
        }
        Relationships: []
      }
      base_commands: {
        Row: {
          command: string
          created_at: string
          id: string
          official_docs_link: string
        }
        Insert: {
          command?: string
          created_at?: string
          id?: string
          official_docs_link?: string
        }
        Update: {
          command?: string
          created_at?: string
          id?: string
          official_docs_link?: string
        }
        Relationships: []
      }
      command_flags: {
        Row: {
          created_at: string
          description: string
          flag: string
          id: string
          short_version: string
        }
        Insert: {
          created_at?: string
          description?: string
          flag?: string
          id?: string
          short_version?: string
        }
        Update: {
          created_at?: string
          description?: string
          flag?: string
          id?: string
          short_version?: string
        }
        Relationships: []
      }
      completed_quizzes: {
        Row: {
          created_at: string
          id: number
          num_correct: number
          num_questions: number
          quiz_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          num_correct: number
          num_questions: number
          quiz_type: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          num_correct?: number
          num_questions?: number
          quiz_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_completed_quizzes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "inactive_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_completed_quizzes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      concepts: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          seo: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          name: string
          seo?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          seo?: string
        }
        Relationships: []
      }
      examples: {
        Row: {
          base_command_id: string
          created_at: string | null
          difficulty: number
          draft: boolean
          editor_notes: string
          example: string
          id: string
          in_cheatsheet: boolean
          learn_more: string
          long_description: string
          seo_description: string
          short_description: string
          specific_example: string
        }
        Insert: {
          base_command_id: string
          created_at?: string | null
          difficulty: number
          draft?: boolean
          editor_notes?: string
          example?: string
          id?: string
          in_cheatsheet?: boolean
          learn_more?: string
          long_description?: string
          seo_description?: string
          short_description?: string
          specific_example?: string
        }
        Update: {
          base_command_id?: string
          created_at?: string | null
          difficulty?: number
          draft?: boolean
          editor_notes?: string
          example?: string
          id?: string
          in_cheatsheet?: boolean
          learn_more?: string
          long_description?: string
          seo_description?: string
          short_description?: string
          specific_example?: string
        }
        Relationships: [
          {
            foreignKeyName: "examples_base_command_id_fkey"
            columns: ["base_command_id"]
            isOneToOne: false
            referencedRelation: "base_commands"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          created_at: string
          feedback: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback?: string
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          can_edit: boolean
          email: string | null
          full_name: string | null
          id: string
          send_reminder_emails: boolean
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          can_edit?: boolean
          email?: string | null
          full_name?: string | null
          id: string
          send_reminder_emails?: boolean
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          can_edit?: boolean
          email?: string | null
          full_name?: string | null
          id?: string
          send_reminder_emails?: boolean
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quizz_answers: {
        Row: {
          correct: boolean
          created_at: string
          example_id: string
          id: number
          quizz_type: number
          user_id: string
        }
        Insert: {
          correct: boolean
          created_at?: string
          example_id: string
          id?: number
          quizz_type: number
          user_id: string
        }
        Update: {
          correct?: boolean
          created_at?: string
          example_id?: string
          id?: number
          quizz_type?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizz_answers_example_id_fkey"
            columns: ["example_id"]
            isOneToOne: false
            referencedRelation: "examples"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizz_answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "inactive_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizz_answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      see_also: {
        Row: {
          example_id1: string
          example_id2: string
        }
        Insert: {
          example_id1: string
          example_id2: string
        }
        Update: {
          example_id1?: string
          example_id2?: string
        }
        Relationships: [
          {
            foreignKeyName: "see_also_example_id1_fkey"
            columns: ["example_id1"]
            isOneToOne: false
            referencedRelation: "examples"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "see_also_example_id2_fkey"
            columns: ["example_id2"]
            isOneToOne: false
            referencedRelation: "examples"
            referencedColumns: ["id"]
          },
        ]
      }
      user_events: {
        Row: {
          created_at: string
          event_type: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "inactive_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notes: {
        Row: {
          bookmarked: boolean
          example_id: string
          for_study: boolean
          user_id: string
        }
        Insert: {
          bookmarked?: boolean
          example_id: string
          for_study?: boolean
          user_id: string
        }
        Update: {
          bookmarked?: boolean
          example_id?: string
          for_study?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notes_example_id_fkey"
            columns: ["example_id"]
            isOneToOne: false
            referencedRelation: "examples"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      inactive_users: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string | null
          last_active_date: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_event_count: {
        Row: {
          event_count: number | null
          event_date: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "inactive_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
