import { useCallback } from 'react';
import useUIZStore from 'hooks/useUIZStore';
import SuccessToast from 'components/SuccessToast';
import { binNote, unbinNote } from 'hooks/useNotesStore';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';

type NoteDeletedAt = number | undefined | null;

const useDeleteNote = (noteId: string, deletedAt: NoteDeletedAt) => {
  const { toast } = useUIZStore();
  const { goToList, goToNote } = useRoutingHelpers();

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
  }, [deletedAt, noteId, toast, goToList, goToNote]);

  return deleteFn;
};

export default useDeleteNote;
