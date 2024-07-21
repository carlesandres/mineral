'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '../supabase/create-server-supabase-client';

export default async function updateConcept(formData: FormData) {
  const supabase = createServerSupabaseClient();
  const id = formData.get('id') as string;
  const description = formData.get('description') as string;
  const seo = formData.get('seo') as string;
  const { error } = await supabase
    .from('concepts')
    .update({ description, seo })
    .eq('id', id);

  if (error) {
    throw error;
  }
  revalidatePath(`/concepts/${id}`);
}
