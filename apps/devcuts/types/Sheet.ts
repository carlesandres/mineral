import type { Database } from 'types/supabase';

export type Sheet = Database['public']['Tables']['sheets']['Row'];
export type SheetInsert = Database['public']['Tables']['sheets']['Insert'];
export type SheetUpdate = Database['public']['Tables']['sheets']['Update'];

export type SheetWithPosition = Sheet & { position: string };
