'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { Cheat } from 'types/Cheat';
import { revalidatePath } from 'next/cache';

export async function deleteCheat(cheat: Cheat) {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase.from('cheats').delete().eq('id', cheat.id);

  const res2 = await supabase
    .from('sections')
    .select('*')
    .eq('id', cheat.section_id)
    .single();

  if (!res.error && res2.data) {
    revalidatePath(`/sheet/${res2.data.sheet_id}`);
  }
  return res;
}
