import React from 'react';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface YouNeedToLoginProps extends React.HTMLAttributes<HTMLDivElement> {}

const YouNeedToLogin = (props: YouNeedToLoginProps) => {
  const { className, children, ...rest } = props;
  return (
    <div
      className={cn(
        `flex flex-col items-center justify-center h-full gap-8 mt-8 sm:mt-32`,
        className,
      )}
      {...rest}
    >
      {children}
      <Button asChild>
        <Link href="/login" className="flex gap-2 items-center justify-center">
          <LogIn size={14} />
          <span>Login</span>
        </Link>
      </Button>
    </div>
  );
};

export default YouNeedToLogin;
