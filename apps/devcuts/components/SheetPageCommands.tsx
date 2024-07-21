'use client';
import React, { useEffect } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from './ui/command';
import { useRouter } from 'next/navigation';

interface SheetPageCommandsProps {}

const SheetPageCommands = (_props: SheetPageCommandsProps) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === 'h' && e.metaKey && e.ctrlKey) {
        e.preventDefault();
        router.push('/');
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [router]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem>
            <span>Show description</span>
          </CommandItem>
          <CommandItem onSelect={() => router.push('/')}>
            <span>Home</span>
            <CommandShortcut>⌘^H</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SheetPageCommands;
