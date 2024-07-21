import type { Database } from 'types/supabase';

export type BaseCommand = Database['public']['Tables']['base_commands']['Row'];
