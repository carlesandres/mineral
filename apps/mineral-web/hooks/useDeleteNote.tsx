import { useCallback } from 'react';
import useUIZStore from 'utils/useUIZStore';
import { goToList, goToNote } from 'utils/navigationHelpers';
import SuccessToast from 'components/SuccessToast';
import { binNote, unbinNote } from 'utils/useNotesStore';

type NoteDeletedAt = number | undefined | null;

const useDeleteNote = (noteId: string, deletedAt: NoteDeletedAt) => {
  const { toast } = useUIZStore();

  const deleteFn = useCallback(() => {
    const message = deletedAt ? 'Unbinned!' : 'Deleted!';
    if (deletedAt) {
      unbinNote(noteId);
    } else {
      binNote(noteId);
    }

    toast(<SuccessToast>{message}</SuccessToast>);
    if (deletedAt) {
      goToNote(noteId);
    } else {
      goToList();
    }
  }, [deletedAt, noteId, toast]);

  return deleteFn;
};

export default useDeleteNote;
