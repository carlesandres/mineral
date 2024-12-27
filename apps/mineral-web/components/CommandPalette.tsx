'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';

import { useEffect, useState } from 'react';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { goToNewFile, goToList, goToBin, goToSettings } = useRoutingHelpers();

  const handleAndClose = (cb: () => void) => {
    return () => {
      cb();
      setOpen(false);
    };
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={handleAndClose(goToNewFile)}>New</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={handleAndClose(goToList)}>List</CommandItem>
          <CommandItem onSelect={handleAndClose(goToBin)}>Bin</CommandItem>
          <CommandItem onSelect={handleAndClose(goToSettings)}>
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
