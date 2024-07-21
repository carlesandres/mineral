import type { Database } from 'types/supabase';
export type UserNote = Database['public']['Tables']['user_notes']['Row'];
