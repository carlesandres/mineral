'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSidebar } from './ui/sidebar';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setOpen, setOpenMobile } = useSidebar();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      setOpen(false);
      setOpenMobile(false);
      previousPathname.current = pathname;
    }
  }, [pathname, searchParams, setOpen]);

  return null;
}
