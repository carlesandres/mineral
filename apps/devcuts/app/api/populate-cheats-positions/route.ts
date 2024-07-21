import { generateNKeysBetween } from 'fractional-indexing';
import { createRouteHandlerSupabaseClient } from 'utils/create-router-handler-supabase-client';

export async function POST(request: Request) {
  const supabase = createRouteHandlerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(null, { status: 400 });
  }

  const { data: cheats, error } = await supabase
    .from('cheats')
    .select('*')
    .eq('section_id', id);

  if (error) {
    return new Response(null, { status: 500 });
  }

  if (!cheats.length) {
    return new Response(null, { status: 204 });
  }

  const hasMissingPositions = cheats.some((cheat) => cheat.position === null);

  if (!hasMissingPositions) {
    return new Response(null, { status: 204 });
  }
  const newPos = generateNKeysBetween(null, null, cheats.length);
  const newCheats = cheats.map((cheat, index) => {
    if (cheat.position === null) {
      return { ...cheat, position: newPos[index] };
    }
    return cheat;
  });

  const { error: error2 } = await supabase.from('cheats').upsert(newCheats);

  if (error2) {
    return new Response(null, { status: 500 });
  }

  return new Response('', { status: 200 });
}
