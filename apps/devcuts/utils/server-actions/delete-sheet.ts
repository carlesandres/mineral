'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { Sheet } from 'types/Sheet';
import { revalidatePath } from 'next/cache';
import { ServerActionResponse } from 'types/ServerActionResponse';

export async function deleteSheet(
  sheetId: Sheet['id'],
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase.from('sheets').delete().eq('id', sheetId);
  if (!res.error) {
    revalidatePath('/');
  }
  return { data: res.data, error: res.error?.message };
}
