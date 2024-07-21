export default async function fetchSupabase(
  query = '',
  headers = {},
  cache: RequestCache | undefined = 'force-cache',
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${query}`,
    {
      headers: {
        ...headers,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
      cache,
    },
  );
  return res;
}
