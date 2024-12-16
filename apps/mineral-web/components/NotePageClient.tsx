'use client';

import { useEffect, useCallback, useState } from 'react';
import NoteContainer from 'components/NoteContainer';
import { messageBroadcast, messageReceive } from 'utils/fileUtils';
import FileInUse from 'components/FileInUse';
import { useList } from 'hooks/useList';
import { useSearchParams } from 'next/navigation';
import { Note } from 'types/Note';
import { notFound } from 'next/navigation';

const NotePageClient = () => {
  const { list, dispatchList } = useList();
  const [fileOpenSomewhereElse, setFileopensomewhereelse] = useState(false);
  const searchParams = useSearchParams();
  const noteId = searchParams?.get('id');
  const allNotes = list?.notes;

  const note =
    allNotes && noteId && allNotes.find((note: Note) => note.id === noteId);
  const title = note?.title || '(Untitled note)';

  const reportFileAlreadyOpen = useCallback(
    (ev2) => {
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

  useEffect(() => {
    if (list.initialized) {
      dispatchList({
        type: 'merge',
        id: noteId,
        partial: {
          updatedAt: new Date().getTime(),
        },
      });
    }
  }, [noteId, dispatchList, list.initialized]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (!list.initialized) {
    return null;
  }

  if (!note) {
    notFound();
  }

  if (fileOpenSomewhereElse) {
    return <FileInUse />;
  }

  return (
    <div className="relative flex h-screen">
      <NoteContainer note={note} />
    </div>
  );
};

export default NotePageClient;
