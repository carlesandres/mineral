'use client';

import { useEffect, useCallback, useState } from 'react';
import NoteContainer from 'components/NoteContainer';
import { messageBroadcast, messageReceive } from 'utils/fileUtils';
import FileInUse from 'components/FileInUse';
import { useSearchParams } from 'next/navigation';
import { Note } from 'types/Note';
import { notFound } from 'next/navigation';
import useNotesStore, { getNotes } from 'hooks/useNotesStore';
// import { useSidebar } from './ui/sidebar';

const NotePageClient = () => {
  const { initialized } = useNotesStore((state) => state);
  const allNotes = getNotes();
  const [fileOpenSomewhereElse, setFileopensomewhereelse] = useState(false);
  const searchParams = useSearchParams();
  const noteId = searchParams?.get('id');
  // const { setOpen } = useSidebar();
  // const [sidebarStateInit, setSidebarStateInit] = useState(false);
  //
  // useEffect(() => {
  //   setSidebarStateInit(false);
  // }, [noteId]);
  //
  // useEffect(() => {
  //   if (!sidebarStateInit) {
  //     setOpen(false);
  //     setSidebarStateInit(true);
  //   }
  // }, [sidebarStateInit, setOpen]);

  if (!noteId) {
    notFound();
  }

  const note = allNotes && allNotes.find((note: Note) => note.id === noteId);

  const reportFileAlreadyOpen = useCallback(
    (ev2: StorageEvent) => {
      const message = messageReceive(ev2);
      if (!message) {
        return;
      }

      const windowInBg = document.visibilityState === 'hidden';
      if (
        message.command === 'fileOpen' &&
        message.id === noteId &&
        windowInBg
      ) {
        setFileopensomewhereelse(true);
      }
    },
    [noteId],
  );

  useEffect(() => {
    // Broadcast to other tabs that this file is open
    if (noteId) {
      messageBroadcast({
        command: 'fileOpen',
        id: noteId,
      });
    }
    window.addEventListener('storage', reportFileAlreadyOpen);
    return () => {
      window.removeEventListener('storage', reportFileAlreadyOpen);
    };
  }, [noteId, reportFileAlreadyOpen]);

  // TO-DO: Re-enable this
  // useEffect(() => {
  //   if (initialized) {
  //     dispatchList({
  //       type: 'merge',
  //       id: noteId,
  //       partial: {
  //         updatedAt: new Date().getTime(),
  //       },
  //     });
  //   }
  // }, [noteId, dispatchList, list.initialized]);

  const title = note?.title || '(Untitled note)';
  useEffect(() => {
    document.title = title;
  }, [title]);

  if (!initialized) {
    return null;
  }

  if (!note) {
    notFound();
  }

  if (fileOpenSomewhereElse) {
    return <FileInUse />;
  }

  return (
    <div className="relative flex h-screen print:h-auto">
      <NoteContainer note={note} />
    </div>
  );
};

export default NotePageClient;
