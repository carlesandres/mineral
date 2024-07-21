'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { SheetInsert } from 'types/Sheet';
import { revalidatePath } from 'next/cache';

export async function upsertSheet(sheets: SheetInsert[]) {
  const supabase = createServerActionClient<Database>({ cookies });
  const sheetsAdded = [] as SheetInsert[];

  for await (const sheet of sheets) {
    const res = await supabase
      .from('sheets')
      .upsert(sheet)
      .select('*')
      .single();

    if (res.error) {
      throw new Error('Something went wrong.');
    }
    sheetsAdded.push(res.data);
    const { id: sheetId } = res.data;

    const res2 = await supabase.from('sections').upsert({ sheet_id: sheetId });
    if (res2.error) {
      console.log('res2', res2);
      throw new Error('Something went wrong.');
    }
  }

  revalidatePath('/');
  return sheetsAdded;
}
