'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { Sheet, SheetUpdate } from 'types/Sheet';
import { revalidatePath } from 'next/cache';

export async function updateSheet(sheet: SheetUpdate, sheetId: Sheet['id']) {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase.from('sheets').update(sheet).eq('id', sheetId);
  revalidatePath('/');
  revalidatePath(`/sheets/${sheetId}`);
  return res;
}
