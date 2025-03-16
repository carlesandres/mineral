'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSidebar } from './ui/sidebar';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setOpen } = useSidebar();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      // This code will run after each navigation
      console.log('Navigation occurred!', pathname);
      setOpen(false);
      previousPathname.current = pathname;
    }
  }, [pathname, searchParams, setOpen]);

  return null;
}
