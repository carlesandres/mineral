'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { GitPullRequest, ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const FirstNavAction = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const router = useRouter();

  return (
    <>
      <GitPullRequest
        size={24}
        className={cn('block sm:hidden w-auto', { hidden: !isHome })}
      />
      <div
        onClick={() => router.back()}
        className={cn('flex gap-2 items-center sm:hidden', {
          hidden: isHome,
        })}
      >
        <ArrowLeft size={20} className={cn('w-auto', { hidden: isHome })} />
        <span className="">Back</span>
      </div>
    </>
  );
};

export default FirstNavAction;
