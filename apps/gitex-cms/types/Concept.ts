import type { Database } from 'types/supabase';

export type Concept = Database['public']['Tables']['concepts']['Row'];
export type ConceptInsert = Database['public']['Tables']['concepts']['Insert'];
export type ConceptUpdate = Database['public']['Tables']['concepts']['Update'];
