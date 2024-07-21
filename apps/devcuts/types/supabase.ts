export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cheats: {
        Row: {
          archived: boolean;
          created_at: string;
          description: string;
          done: boolean;
          hook: string;
          id: number;
          old_sheet_id: string | null;
          position: string;
          section_id: string;
          updated_at: string;
        };
        Insert: {
          archived?: boolean;
          created_at?: string;
          description: string;
          done?: boolean;
          hook: string;
          id?: number;
          old_sheet_id?: string | null;
          position: string;
          section_id: string;
          updated_at?: string;
        };
        Update: {
          archived?: boolean;
          created_at?: string;
          description?: string;
          done?: boolean;
          hook?: string;
          id?: number;
          old_sheet_id?: string | null;
          position?: string;
          section_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'cheats_old_sheet_id_fkey';
            columns: ['old_sheet_id'];
            isOneToOne: false;
            referencedRelation: 'sheets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cheats_section_id_fkey';
            columns: ['section_id'];
            isOneToOne: false;
            referencedRelation: 'sections';
            referencedColumns: ['id'];
          },
        ];
      };
      feedback: {
        Row: {
          created_at: string;
          feedback: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          feedback?: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          feedback?: string;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'feedback_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          can_edit: boolean;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          can_edit?: boolean;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          can_edit?: boolean;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      sections: {
        Row: {
          description: string;
          id: string;
          position: string | null;
          sheet_id: string | null;
        };
        Insert: {
          description?: string;
          id?: string;
          position?: string | null;
          sheet_id?: string | null;
        };
        Update: {
          description?: string;
          id?: string;
          position?: string | null;
          sheet_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'sections_sheet_id_fkey';
            columns: ['sheet_id'];
            isOneToOne: false;
            referencedRelation: 'sheets';
            referencedColumns: ['id'];
          },
        ];
      };
      sheets: {
        Row: {
          color: string;
          created_at: string;
          description: string;
          id: string;
          is_public: boolean;
          num_cols: number;
          owner_id: string;
          position: string;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          color?: string;
          created_at?: string;
          description?: string;
          id?: string;
          is_public?: boolean;
          num_cols?: number;
          owner_id: string;
          position: string;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          description?: string;
          id?: string;
          is_public?: boolean;
          num_cols?: number;
          owner_id?: string;
          position?: string;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sheets_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      waitlist: {
        Row: {
          created_at: string;
          email: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
