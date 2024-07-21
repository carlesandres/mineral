export default async function fetchSupabase(query = '') {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${query}`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
    },
  );
  if (res.status !== 200) {
    console.log('res', res);
    throw new Error('Something went wrong');
  }
  const result = await res.json();
  return result;
}

export const fetchFromSupabase = async (path: string) => {
  const res = await fetchSupabase(path);
  return res;
};
