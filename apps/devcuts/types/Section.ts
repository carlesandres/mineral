import type { Database } from 'types/supabase';

export type Section = Database['public']['Tables']['sections']['Row'];
export type SectionInsert = Database['public']['Tables']['sections']['Insert'];
export type SectionUpdate = Database['public']['Tables']['sections']['Update'];
