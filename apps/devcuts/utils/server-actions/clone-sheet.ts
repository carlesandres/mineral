'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { Sheet } from 'types/Sheet';
import { revalidatePath } from 'next/cache';
import { ServerActionResponse } from 'types/ServerActionResponse';
import { getNextSheetPos } from 'utils/get-next-sheet-pos';

export async function cloneSheet(
  sheetId: Sheet['id'],
): Promise<ServerActionResponse> {
  const supabase = createServerActionClient<Database>({ cookies });
  const nextSheetPos = await getNextSheetPos(false);

  if (!nextSheetPos) {
    return { error: 'Error generating next sheet position' };
  }

  const { data: sheet, error } = await supabase
    .from('sheets')
    .select('*, sections(*)')
    .eq('id', sheetId)
    .single();

  if (error || !sheet) {
    return { error: 'Error fetching sheet' };
  }

  const { id, title, position, sections, ...rest } = sheet;
  const newSheet = {
    ...rest,
    title: `${sheet.title} (Clone)`,
    position: nextSheetPos,
  };

  const { data: fullNewSheet, error: insertError } = await supabase
    .from('sheets')
    .insert([newSheet])
    .select();
  if (insertError || !fullNewSheet) {
    return { error: 'Error inserting new sheet' };
  }

  const newSheetId = fullNewSheet[0].id;

  const newSections = sections.map((section) => {
    const { id, sheet_id, ...rest } = section;
    const newSection = {
      ...rest,
      sheet_id: newSheetId,
    };
    return newSection;
  });

  const { data: fullNewSections, error: insertError2 } = await supabase
    .from('sections')
    .insert([...newSections])
    .select();

  if (insertError2 || !fullNewSections) {
    return { error: 'Error inserting new sections' };
  }

  // Get cheats in original sheet
  const { data: cheats, error: cheatsError } = await supabase
    .from('cheats')
    .select('*, sections(*)')
    .eq('section.id', sheetId);
  if (cheatsError || !cheats) {
    return { error: 'Error fetching cheats' };
  }

  //// Insert cheats in new sheet with new sheet id
  //const newCheats = cheats.map((cheat) => {
  //  const { id, sheet_id, ...rest } = cheat;
  //  const newCheat = {
  //    ...rest,
  //    sheet_id: fullNewSheet[0].id,
  //  };
  //  return newCheat;
  //});
  //const res = await supabase.from('cheats').insert(newCheats);
  //
  //const { error: insertCheatsError } = res;
  //
  //if (insertCheatsError) {
  //  console.log('--------------------------------------------------- 3');
  //  return { error: 'Error inserting cheats' };
  //}

  revalidatePath('/');
  return { data: fullNewSheet[0].id };
}
