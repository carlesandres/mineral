'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../supabase/create-server-supabase-client';

export default async function sendEmail(formData: FormData) {
  const supabase = createServerSupabaseClient();
  const email = formData.get('email') as string;
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.log('error', error);
    redirect(`/reset-password?error=true`);
  }
  redirect(`/reset-password?sent=${email}`);
}
