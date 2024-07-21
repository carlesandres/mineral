import React, { useState } from 'react';
import { getShownFiles } from 'utils/fileUtils.js';
import Router from 'next/router';
import PleaseWait from 'components/PleaseWait';
import { useEffect } from 'react';
import { useList } from 'hooks/useList';
import PageLayout from 'components/PageLayout';
import { sortBy } from 'lodash';

const LastNote = () => {
  const { list } = useList();
  const [error, setError] = useState('');

  useEffect(() => {
    const { initialized, notes } = list;
    if (initialized) {
      const activeNotes = getShownFiles(notes, 'INBOX', '');
      const sortedNotes = sortBy(activeNotes, 'updatedAt').reverse();
      if (!notes.length) {
        setError('There are no notes in your list at the moment');
        return;
      }

      const lastNoteId = sortedNotes[0].id;
      const href = `/note?id=${lastNoteId}`;
      Router.push(href);
    }
  }, [list]);

  if (error) {
    return <p>{error}</p>;
  }

  return <PleaseWait message="Opening last note..." />;
};

LastNote.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default LastNote;
