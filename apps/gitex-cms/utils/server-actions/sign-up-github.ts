'use server';

import { headers } from 'next/headers';
import { createServerSupabaseClient } from '../supabase/create-server-supabase-client';
import { redirect } from 'next/navigation';

export default async function signUpWithGithub() {
  const supabase = createServerSupabaseClient();
  const origin = headers().get('origin');

  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${origin}/auth/callback`
    },
  });


  console.log('data.url', data.url);

  if (data.url) {
    redirect(data.url);
  }

}
