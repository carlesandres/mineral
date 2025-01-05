'use client';

import useNotesStore, { getNotes } from 'hooks/useNotesStore';
import CreateNoteButton from './CreateNoteButton';
import GoToDashboardButton from './GoToDashboardButton';

const LandingCTA = () => {
  const { initialized } = useNotesStore((state) => state);
  const notes = getNotes();

  if (!initialized) {
    return null;
  }

  if (notes.length > 0) {
    return <GoToDashboardButton />;
  }

  return <CreateNoteButton />;
};

export default LandingCTA;
