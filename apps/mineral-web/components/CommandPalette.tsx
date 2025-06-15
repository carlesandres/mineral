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
import { CommandSeparator } from 'cmdk';
import { useGetNoteid } from 'hooks/use-get-note-id';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';
import useDeleteNote from 'hooks/useDeleteNote';
import { Expand, Moon, PlusCircle, Presentation, Trash } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';
import BinNoteModal from './BinNoteModal';
import useUIZStore from '@/hooks/useUIZStore';
import { usePreviousNote } from '@/hooks/use-previous-note';

const isDev = process.env.NODE_ENV === 'development';

export default function CommandPalette() {
  const { cmdPaletteVisible: open, setCmdPaletteVisible: setOpen } =
    useUIZStore();
  const {
    goToNewFile,
    goToList,
    goToBin,
    goToSettings,
    goToLast,
    goToNote,
    goToSlides,
  } = useRoutingHelpers();
  const { theme, setTheme } = useTheme();
  const noteId = useGetNoteid();
  const previousNote = usePreviousNote();
  const binNote = useDeleteNote(noteId, null);
  const toggleNoteWidth = useToggleNoteWidth(noteId);
  const pathname = usePathname();
  const [showEmptyBinModal, setShowEmptyBinModal] = useState(false);

  const isBin = pathname === '/bin';

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const handleAndClose = (cb: (() => void) | undefined) => {
    return () => {
      cb && cb();
      setOpen(false);
    };
  };

  const handleGoToSlides = useCallback(() => {
    if (noteId) {
      goToSlides(noteId);
      return;
    }
  }, [noteId, goToSlides]);

  const handleGoToLast = useCallback(() => {
    if (noteId && previousNote) {
      goToNote(previousNote.id);
      return;
    }
    goToLast();
  }, [noteId, previousNote, goToLast, goToNote]);

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
        handleGoToLast();
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
    handleGoToLast,
    setOpen,
  ]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {noteId && (
          <>
            <CommandGroup heading="Note actions">
              <CommandItem onSelect={handleAndClose(binNote)}>
                <Trash />
                <span>Delete note</span>
              </CommandItem>
              <CommandItem onSelect={handleAndClose(toggleNoteWidth)}>
                <Expand />
                <span>Toggle Width</span>
              </CommandItem>
              {isDev && (
                <CommandItem onSelect={handleAndClose(handleGoToSlides)}>
                  <Presentation />
                  <span>Show slides</span>
                </CommandItem>
              )}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        {isBin && (
          <>
            <CommandGroup heading="Bin actions">
              <CommandItem onSelect={() => setShowEmptyBinModal(true)}>
                <Trash />
                <span>Empty bin</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <BinNoteModal
              show={showEmptyBinModal}
              setShow={setShowEmptyBinModal}
            />
          </>
        )}
        <CommandGroup heading="Actions">
          <CommandItem onSelect={handleAndClose(goToNewFile)}>
            <PlusCircle />
            <span>New note</span>
            <CommandShortcut>^N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAndClose(handleToggleTheme)}>
            <Moon />
            <span>Toggle Theme (light/dark)</span>
            <CommandShortcut>^T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={handleAndClose(goToList)}>
            <span>Dashboard</span>
            <CommandShortcut>^D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAndClose(goToBin)}>
            <span>Bin</span>
          </CommandItem>
          <CommandItem onSelect={handleAndClose(goToSettings)}>
            <span>Settings</span>
            <CommandShortcut>^S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
