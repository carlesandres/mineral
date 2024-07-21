import type { Database } from 'types/supabase';

export type Cheat = Database['public']['Tables']['cheats']['Row'];
export type CheatInsert = Database['public']['Tables']['cheats']['Insert'];
export type CheatUpdate = Database['public']['Tables']['cheats']['Update'];
