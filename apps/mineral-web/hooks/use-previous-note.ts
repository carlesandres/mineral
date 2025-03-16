import { sortBy } from 'lodash';
import { getNotes } from './useNotesStore';

// TO-DO: Does this need to be a hook
export const usePreviousNote = () => {
  const notes = getNotes();

  if (notes.length > 1) {
    // get previous to last
    const sortedNotes = sortBy(notes, 'updatedAt').reverse();
    return sortedNotes[1];
  }
  return null;
};
