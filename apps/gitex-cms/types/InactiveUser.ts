import { Database } from 'types/supabase';

export type InactiveUser = Database['public']['Views']['inactive_users']['Row'];

