import { useCallback } from 'react';
import { useList } from 'hooks/useList';
import useUIZStore from 'utils/useUIZStore';
import { Note } from 'types/Note';
import { goToList, goToNote } from 'utils/navigationHelpers';
import SuccessToast from 'components/SuccessToast';

type NotePartial = Partial<Note>;
type NoteDeletedAt = number | undefined;

const useDeleteNote = (noteId: string, deletedAt: NoteDeletedAt) => {
  const { dispatchList } = useList();
  const { toast } = useUIZStore();

  const deleteFn = useCallback(() => {
    // Toggles deletedAt so it can also move things out of the bin
    const newDeletedAt = deletedAt ? null : new Date().getTime();
    const partial: NotePartial = { deletedAt: newDeletedAt };

    // If it was deleted, we want are putting it back to the "active" list
    // and we want it to be considered "just updated" "so it goes at the top
    // of the list
    if (deletedAt) {
      partial.updatedAt = new Date().getTime();
    }

    const message = deletedAt ? 'Unbinned!' : 'Deleted!';

    dispatchList({
      type: 'merge',
      id: noteId,
      partial,
    });
    toast(<SuccessToast>{message}</SuccessToast>);
    if (deletedAt) {
      goToNote(noteId);
    } else {
      goToList();
    }
  }, [dispatchList, noteId, deletedAt]);

  return deleteFn;
};

export default useDeleteNote;
