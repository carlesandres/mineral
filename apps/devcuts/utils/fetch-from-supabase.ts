import { unstable_cache } from 'next/cache';

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
    throw new Error('Something went wrong');
  }
  const result = await res.json();
  return result;
}

export const fetchFromSupabase = async (path: string, tags?: string[]) => {
  let res;

  if (tags) {
    const cached = unstable_cache(
      async (path) => await fetchSupabase(path),
      tags,
    );
    res = await cached(path);
  } else {
    res = await fetchSupabase(path);
  }
  return res;
};
