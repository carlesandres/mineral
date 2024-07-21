import type { Database } from 'types/supabase';

export type Example = Database['public']['Tables']['examples']['Row'];
export type ExampleInsert = Database['public']['Tables']['examples']['Insert'];
export type ExampleUpdate = Database['public']['Tables']['examples']['Update'];
