'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';
import { useTheme } from 'next-themes';

import { useEffect, useState } from 'react';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { goToNewFile, goToList, goToBin, goToSettings } = useRoutingHelpers();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setOpen(false);
  };

  const handleAndClose = (cb: () => void) => {
    return () => {
      cb();
      setOpen(false);
    };
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'n' && e.ctrlKey) {
        e.preventDefault();
        goToNewFile();
        return;
      }
      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        goToList();
        return;
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [goToNewFile, goToList]);

  const darkModeLabel = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={handleAndClose(goToNewFile)}>
            <span>New note</span>
            <CommandShortcut>^N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={handleAndClose(goToList)}>
            <span>List</span>
            <CommandShortcut>^L</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAndClose(goToBin)}>Bin</CommandItem>
          <CommandItem onSelect={handleAndClose(goToSettings)}>
            Settings
          </CommandItem>
          <CommandItem onSelect={toggleTheme}>{darkModeLabel}</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
