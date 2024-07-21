'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cookies } from 'next/headers';

type Pos = string | null;

export async function getFirstAndLastCheatPos(sectionId: string) {
  const supabase = createServerActionClient<Database>({ cookies });

  let firstCheatPos: Pos = null;
  let lastCheatPos: Pos = null;

  const res = await supabase
    .from('cheats')
    .select('position')
    .eq('section_id', sectionId)
    .order('position', { ascending: true })
    .limit(1)
    .single();

  if (res.data) {
    firstCheatPos = res.data.position;
  }

  const res2 = await supabase
    .from('cheats')
    .select('position')
    .eq('section_id', sectionId)
    .order('position', { ascending: false })
    .limit(1)
    .single();

  if (res2.data) {
    lastCheatPos = res2.data.position;
  }

  // Errors will make the function return nulls
  return [firstCheatPos, lastCheatPos];
}
