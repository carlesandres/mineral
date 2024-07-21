'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';
import { Section, SectionUpdate } from 'types/Section';
import { revalidatePath } from 'next/cache';

export async function updateSection(
  section: SectionUpdate,
  sectionId: Section['id'],
  sheetId: Section['sheet_id'],
) {
  const supabase = createServerActionClient<Database>({ cookies });
  const res = await supabase
    .from('sections')
    .update(section)
    .eq('id', sectionId);
  revalidatePath(`/sheet/${sheetId}`);
  return res;
}
