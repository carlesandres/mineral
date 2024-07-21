'use client';

import React, { useCallback, useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from 'components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { cn } from 'utils';

interface AuthProps {
  className?: string;
}

export default function Auth(props: AuthProps) {
  const { className } = props;
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);

  const handleGithub = useCallback(async () => {
    setLoading(true);
    const redirectUrl = `${window.location.origin}/auth/callback`;
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectUrl,
      },
    });
    // setting loading false here would not wait for the redirect
  }, [supabase.auth]);

  return (
    <div
      className={cn(
        ` flex-center mx-auto flex max-w-2xl flex-col items-center p-4 pt-16 sm:pt-32`,
        className,
      )}
    >
      <Button
        onClick={handleGithub}
        className="button mx-auto inline-flex items-center justify-center space-x-2"
        disabled={loading}
      >
        <Github size={16} className={cn({ 'animate-spin': loading })} />
        <span>Sign in with GitHub</span>
      </Button>
    </div>
  );
}
