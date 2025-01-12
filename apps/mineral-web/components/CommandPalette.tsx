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
import { useToggleNoteWidth } from '@/hooks/use-toggle-note-width';
import { useGetNoteid } from 'hooks/use-get-note-id';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';
import useDeleteNote from 'hooks/useDeleteNote';
import { Expand, Moon, PlusCircle, Trash } from 'lucide-react';
import { useTheme } from 'next-themes';

import { useCallback, useEffect, useState } from 'react';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { goToNewFile, goToList, goToBin, goToSettings, goToLast } =
    useRoutingHelpers();
  const { theme, setTheme } = useTheme();
  const noteId = useGetNoteid();
  const binNote = useDeleteNote(noteId, null);
  const toggleNoteWidth = useToggleNoteWidth(noteId);

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const handleAndClose = (cb: (() => void) | undefined) => {
    return () => {
      cb && cb();
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
      if (e.key === 'd' && e.ctrlKey) {
        e.preventDefault();
        goToList();
        return;
      }
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        goToSettings();
        return;
      }
      if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        handleToggleTheme();
        return;
      }
      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        goToLast();
        return;
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [
    goToNewFile,
    goToList,
    goToBin,
    goToSettings,
    handleToggleTheme,
    goToLast,
  ]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {noteId && (
          <CommandGroup heading="Note actions">
            <CommandItem onSelect={handleAndClose(binNote)}>
              <Trash />
              <span>Delete note</span>
            </CommandItem>
            <CommandItem onSelect={handleAndClose(toggleNoteWidth)}>
              <Expand />
              <span>Toggle Width</span>
            </CommandItem>
          </CommandGroup>
        )}
        <CommandGroup heading="Actions">
          <CommandItem onSelect={handleAndClose(goToNewFile)}>
            <PlusCircle />
            <span>New note</span>
            <CommandShortcut>^N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleToggleTheme}>
            <Moon />
            <span>Toggle Theme (light/dark)</span>
            <CommandShortcut>^T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={handleAndClose(goToList)}>
            <span>Go to Dashboard</span>
            <CommandShortcut>^D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAndClose(goToBin)}>
            <span>Go to Bin</span>
          </CommandItem>
          <CommandItem onSelect={handleAndClose(goToSettings)}>
            <span>Go to Settings</span>
            <CommandShortcut>^S</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAndClose(goToLast)}>
            <span>Go to most recent note</span>
            <CommandShortcut>^L</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
