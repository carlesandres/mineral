'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { Cheat, CheatUpdate } from 'types/Cheat';
import { revalidatePath } from 'next/cache';
import { getNextCheatPos } from 'utils/get-next-cheat-pos';

export async function moveCheatToTop(cheat: CheatUpdate, cheatId: Cheat['id']) {
  const supabase = createServerActionClient<Database>({ cookies });

  if (!cheat.section_id) {
    throw new Error('Section ID is required');
  }

  const nextPos = await getNextCheatPos(cheat.section_id, true);

  if (!nextPos) {
    throw new Error('Something went wrong.');
  }

  const res = await supabase
    .from('cheats')
    .update({ position: nextPos })
    .eq('id', cheatId);

  if (res.error) {
    throw new Error('Error updating cheat');
  }

  const res2 = await supabase
    .from('sections')
    .select('*')
    .eq('id', cheat.section_id)
    .single();

  if (res2.error) {
    throw new Error('Error fetching section');
  }

  if (res2.data) {
    revalidatePath(`/cheats/${res2.data.sheet_id}`);
  }

  return res;
}
