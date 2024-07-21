'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { createServerSupabaseClient } from '../supabase/create-server-supabase-client';

export default async function deleteFlag(formData: FormData) {
  const supabase = createServerSupabaseClient();
  const id = formData.get('id') as string;
  const { error } = await supabase.from('command_flags').delete().match({ id });

  if (error) {
    throw error;
  }
  revalidatePath(`/base_command/${id}`);
  revalidateTag('cheatsheet');
}
