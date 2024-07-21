'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { Cheat } from 'types/Cheat';
import { revalidatePath } from 'next/cache';

export async function upsertCheats(
  cheats: Cheat[],
  sheetIdToRevalidate?: string,
) {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase.from('cheats').upsert(cheats);
  if (sheetIdToRevalidate) {
    console.log(
      '--------------------------------------------------- revalidating sheet',
    );
    revalidatePath(`/sheets/${sheetIdToRevalidate}`);
  }
  return res;
}
