import { useCallback } from 'react';
import { binNote, unbinNote } from 'hooks/useNotesStore';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';
import { toast } from 'sonner';
import NoteDeletedMsg from '@/components/NoteDeletedMsg';

type NoteDeletedAt = number | undefined | null;

const useDeleteNote = (noteId: string | null, deletedAt: NoteDeletedAt) => {
  const { goToList, goToNote } = useRoutingHelpers();

  const deleteFn = useCallback(() => {
    if (!noteId) {
      return;
    }

    if (deletedAt) {
      unbinNote(noteId);
      toast.success('Note unbinned');
      goToNote(noteId);
    } else {
      binNote(noteId);
      toast.success(<NoteDeletedMsg noteId={noteId} />);
      goToList();
    }
  }, [deletedAt, noteId, goToList, goToNote]);

  return deleteFn;
};

export default useDeleteNote;
