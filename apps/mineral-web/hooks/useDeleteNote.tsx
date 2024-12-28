import { useCallback } from 'react';
import { binNote, unbinNote } from 'hooks/useNotesStore';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';
import { toast } from 'sonner';

type NoteDeletedAt = number | undefined | null;

const useDeleteNote = (noteId: string, deletedAt: NoteDeletedAt) => {
  const { goToList, goToNote } = useRoutingHelpers();

  const deleteFn = useCallback(() => {
    const message = deletedAt ? 'Note unbinned' : 'Note sent to bin';
    if (deletedAt) {
      unbinNote(noteId);
    } else {
      binNote(noteId);
    }

    toast.success(message);
    if (deletedAt) {
      goToNote(noteId);
    } else {
      goToList();
    }
  }, [deletedAt, noteId, goToList, goToNote]);

  return deleteFn;
};

export default useDeleteNote;
