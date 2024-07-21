'use client';

import React, { useCallback } from 'react';
import { Button } from 'components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { useRouter } from 'next/navigation';

type SignOutButtonProps = Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  'onClick'
>;

const SignOutButton = (props: SignOutButtonProps) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.refresh();
  }, [supabase.auth, router]);

  return (
    <Button onClick={signOut} {...props}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
