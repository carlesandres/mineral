import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';

export async function canUserEdit() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  const userId = data?.user?.id;

  if (!userId) {
    return false;
  }

  const { data: user2, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !user2) {
    console.error(error);
    return false;
  }

  return user2.can_edit;
}
