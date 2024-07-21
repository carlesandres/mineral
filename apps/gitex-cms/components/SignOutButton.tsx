'use client';

import React, { useCallback } from 'react';
import { Button } from 'components/ui/button';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

type SignOutButtonProps = Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  'onClick'
>;

const SignOutButton = (props: SignOutButtonProps) => {
  const { className } = props;
  const supabase = supabaseBrowserClient();
  const router = useRouter();

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.refresh();
  }, [supabase.auth, router]);

  return (
    <Button
      onClick={signOut}
      className={cn('flex items-center space-x-2 ', className)}
      {...props}
    >
      <LogOut size={16} />
      <span>Sign out</span>
    </Button>
  );
};

export default SignOutButton;
