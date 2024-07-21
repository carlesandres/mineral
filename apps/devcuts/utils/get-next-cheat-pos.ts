import { generateKeyBetween } from 'fractional-indexing';
import { createServerSupabaseClient } from 'utils/create-server-supabase-client';

export const getNextCheatPos = async (sectionId: string, isFirst = true) => {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id) {
    return null;
  }

  // Select last
  const { data: cheats, error } = await supabase
    .from('cheats')
    .select('*')
    .eq('section_id', sectionId)
    .order('position', { ascending: isFirst });

  if (error) {
    console.log('error', error);
    return null;
  }

  // This will be the first if isFirst is true, and the last if isFirst is false
  const referencePos = cheats?.[0]?.position ?? null;
  // We add new cheats before the first cheat, or after the last cheat
  const nextCheatPos = isFirst
    ? generateKeyBetween(null, referencePos)
    : generateKeyBetween(referencePos, null);

  return nextCheatPos;
};
