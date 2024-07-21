import { generateNKeysBetween } from 'fractional-indexing';
import { createRouteHandlerSupabaseClient } from 'utils/create-router-handler-supabase-client';

export async function POST() {
  const supabase = createRouteHandlerSupabaseClient();

  const { data: sheets, error } = await supabase.from('sheets').select('*');

  if (error) {
    return new Response(null, { status: 500 });
  }

  if (!sheets.length) {
    return new Response(null, { status: 204 });
  }

  const hasMissingPositions = sheets.some((sheet) => sheet.position === null);

  if (!hasMissingPositions) {
    return new Response(null, { status: 204 });
  }
  const newPos = generateNKeysBetween(null, null, sheets.length);
  const newSheets = sheets.map((sheet, index) => {
    if (sheet.position === null) {
      return { ...sheet, position: newPos[index] };
    }
    return sheet;
  });

  const { error: error2 } = await supabase.from('sheets').upsert(newSheets);

  if (error2) {
    return new Response(null, { status: 500 });
  }

  return new Response('', { status: 200 });
}
