import FloatingActions from 'components/FloatingActions';
import { Note } from 'types/Note';
import ListItemDate from 'components/ListItemDate';
import ColorBall from 'components/ColorBall';
import Link from 'next/link';
import { binNote, unbinNote } from 'hooks/useNotesStore';
import { toast } from 'sonner';
import { Trash, Undo2 } from 'lucide-react';

interface Props {
  note: Note;
}

const ListItem = (props: Props) => {
  const { note } = props;
  const { id: noteId, deletedAt, title, text } = note;

  const untitledClass = title ? '' : 'text-gray-400 dark:text-gray-500';

  const handleBinNote = () => {
    if (deletedAt) {
      unbinNote(noteId);
      toast.success('Note unbinned');
      return;
    }
    binNote(noteId);
    toast.success('Note sent to bin');
  };

  // TO-DO: Fix action on undelete

  const ActionIcon = deletedAt ? Undo2 : Trash;

  const renderedTitle = title || text.slice(0, 20) || '(no content)';

  return (
    <Link
      href={`/note?id=${noteId}`}
      className={`list-group-item group relative w-full justify-between rounded border border-[var(--border-color)] bg-white px-2 py-2 transition hover:bg-gray-200 focus:ring-2 focus:ring-inset disabled:text-gray-400 disabled:hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 disabled:dark:text-gray-500 disabled:dark:hover:bg-gray-800`}
    >
      <div className="relative flex w-full items-center justify-start">
        <ColorBall color={note.color} small className="mr-2" />
        <div
          className={`title mr-4 w-full truncate whitespace-nowrap text-left font-mono ${untitledClass}`}
        >
          {renderedTitle}
        </div>
        <ListItemDate date={note.updatedAt} />
      </div>
      <FloatingActions>
        <ActionIcon
          className="h-6 w-6 cursor-pointer rounded-full bg-gray-50 p-1.5 text-gray-800 transition hover:bg-gray-800 hover:text-gray-200 dark:bg-gray-300 dark:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-gray-800"
          onClick={handleBinNote}
        />
      </FloatingActions>
    </Link>
  );
};

export default ListItem;
