'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { Cheat, CheatUpdate } from 'types/Cheat';
import { revalidatePath } from 'next/cache';

export async function updateCheat(
  cheat: CheatUpdate,
  cheatId: Cheat['id'],
  sectionId: Cheat['section_id'],
) {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase.from('cheats').update(cheat).eq('id', cheatId);

  if (res.error) {
    throw new Error('Error updating cheat');
  }

  const res2 = await supabase
    .from('sections')
    .select('*')
    .eq('id', sectionId)
    .single();

  if (res2.error) {
    throw new Error('Error fetching section');
  }

  if (res2.data) {
    revalidatePath(`/cheats/${res2.data.sheet_id}`);
  }
  return res;
}
