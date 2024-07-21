import { useEffect, useCallback, useState, ReactNode } from 'react';
import NoteContainer from 'components/NoteContainer';
import { messageBroadcast, messageReceive } from 'utils/fileUtils.js';
import FileInUse from 'components/FileInUse';
import PageLayout from 'components/PageLayout';
// import { mainTitle } from 'components/AppConstants';
// import Head from 'next/head';
// import { useState, useEffect } from 'react';
import { useList } from 'hooks/useList';
import { useRouter } from 'next/router';
import FourOhFour from 'components/FourOhFour';
import { Note } from 'types/Note';

const NotePage = () => {
  const { list, dispatchList } = useList();
  const [fileOpenSomewhereElse, setFileopensomewhereelse] = useState(false);
  const router = useRouter();
  const { query } = router;
  const noteId = query?.id;
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
    [noteId]
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
    return <FourOhFour />;
  }

  if (fileOpenSomewhereElse) {
    return <FileInUse />;
  }

  return <NoteContainer note={note} />;
};

NotePage.getLayout = (page: ReactNode) => {
  return (
    <PageLayout pageClass="file-page" isFixedHeight>
      {page}
    </PageLayout>
  );
};

export default NotePage;
