import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from 'utils/create-router-handler-supabase-client';

export async function GET(
  _request: Request,
  context: { params: { id: string } },
) {
  const sheetId = context.params.id;

  if (!sheetId) {
    return new Response(null, { status: 400 });
  }

  const supabase = createRouteHandlerSupabaseClient();
  const { data: sheet, error } = await supabase
    .from('sheets')
    .select()
    .eq('id', sheetId)
    .single();
  if (error) {
    console.error('error fetching sheet', error);
    return new Response(null, { status: 500 });
  }

  const { data: cheats, error: cheatsError } = await supabase
    .from('cheats')
    .select()
    .eq('sheet_id', sheetId);
  if (cheatsError) {
    console.error('error fetching cheats', cheatsError);
    return new Response(null, { status: 500 });
  }

  return NextResponse.json({ sheet, cheats });
}
