import CMSAccessLink from '@/components/CMSAccessLink';
import SignOutButton from '@/components/SignOutButton';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import { redirect } from 'next/navigation';
import React from 'react';

const AccountPage = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const username = user.user_metadata.full_name || user.email;
  return (
    <div className="container mx-auto mt-16 max-w-4xl p-4 text-center">
      <h1 className="mt-20 text-2xl font-bold">Hi {username || ''}!</h1>
      <div className="mt-16 flex justify-center gap-4">
        <SignOutButton />
        <CMSAccessLink />
      </div>
    </div>
  );
};

export default AccountPage;
