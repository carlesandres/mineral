import { generateKeyBetween } from 'fractional-indexing';
import { createServerSupabaseClient } from 'utils/create-server-supabase-client';

export const getNextSheetPos = async (isFirst = true) => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id) {
    return null;
  }

  // Select last
  const { data: sheets, error } = await supabase
    .from('sheets')
    .select('*')
    .order('position', { ascending: isFirst });

  if (error) {
    console.log('error', error);
    return null;
  }

  // This will be the first if isFirst is true, and the last if isFirst is false
  const referencePos = sheets?.[0]?.position ?? null;
  // We add new sheets before the first sheet, or after the last sheet
  const nextSheetPos = isFirst
    ? generateKeyBetween(null, referencePos)
    : generateKeyBetween(referencePos, null);

  return nextSheetPos;
};
