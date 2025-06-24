import { getNoteById, updateNote } from './useNotesStore';

export const useToggleNoteWidth = (noteId: string | null) => {
  if (!noteId) {
    return;
  }

  const note = getNoteById(noteId);

  if (!note) {
    return;
  }

  const updater = () => {
    updateNote(note.id, { wide: !note.wide });
  };

  return updater;
};
