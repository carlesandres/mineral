import { unbinNote } from 'hooks/useNotesStore';
import { useCallback } from 'react';
import { Button } from './ui/button';
import { useRoutingHelpers } from '@/hooks/use-routing-helpers';

interface NoteDeletedMsgProps {
  noteId: string;
}

const NoteDeletedMsg = (props: NoteDeletedMsgProps) => {
  const { noteId } = props;
  const { goToNote } = useRoutingHelpers();

  const handleUndo = useCallback(() => {
    unbinNote(noteId);
    goToNote(noteId);
  }, [noteId, goToNote]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <p>Note deleted successfully!</p>
      <Button variant="outline" onClick={handleUndo}>
        Click here to undo
      </Button>
    </div>
  );
};

export default NoteDeletedMsg;
