'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { CheatInsert } from 'types/Cheat';
import { revalidatePath } from 'next/cache';

export async function addCheat(cheat: CheatInsert & { position: string }) {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase.from('cheats').insert(cheat);
  if (res.error) {
    throw res.error;
  }
  const { section_id: sectionId } = cheat;
  const { data: sheetId, error } = await supabase
    .from('sections')
    .select('sheet_id')
    .eq('id', sectionId)
    .single();
  if (error) {
    throw error;
  }
  revalidatePath(`/cheats/${sheetId}`);
  return res;
}
