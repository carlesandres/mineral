'use client';

import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';
import { Button } from 'components/ui/button';
import { useFormStatus } from 'react-dom';
import { ComponentProps } from 'react';

type LoginButtonProps = ComponentProps<typeof Button>;

const LoginButton = (props: LoginButtonProps) => {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} aria-disabled={pending} type="submit">
      <Github size={16} className={cn({ 'animate-spin': isPending })} />
      <span>Sign in with GitHub</span>
    </Button>
  );
};

export default LoginButton;
