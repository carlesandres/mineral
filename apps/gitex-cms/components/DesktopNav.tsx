import React from 'react';
import UserAvatar from 'components/UserAvatar';
import Shell from 'components/Shell';
import FirstNavAction from './FirstNavAction';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';

const DesktopNav = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  return (
    <header className="fixed top-0 z-10 w-full bg-white border-b border-gray-100 print:hidden">
      <nav className="mx-auto max-w-4xl px-6 lg:px-0" aria-label="Top">
        <div className="flex gap-4 max-w-4xl h-16 w-full items-center justify-between lg:border-none">
          <div className="flex items-center gap-8 flex-1">
            <FirstNavAction />
            <Shell />
          </div>
          <UserAvatar user={user} />
        </div>
      </nav>
    </header>
  );
};

export default DesktopNav;
