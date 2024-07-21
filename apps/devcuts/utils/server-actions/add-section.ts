'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import type { Sheet } from 'types/Sheet';

export async function addSection(sheetId: Sheet['id']) {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase.from('sections').insert({ sheet_id: sheetId });
  if (res.error) {
    throw res.error;
  }
  revalidatePath(`/sheets/${sheetId}`);
  return res;
}
