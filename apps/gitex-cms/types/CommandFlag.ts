import type { Database } from 'types/supabase';

export type CommandFlag = Database['public']['Tables']['command_flags']['Row'];
export type CommandFlagInsert =
  Database['public']['Tables']['command_flags']['Insert'];
export type CommandFlagUpdate =
  Database['public']['Tables']['command_flags']['Update'];
