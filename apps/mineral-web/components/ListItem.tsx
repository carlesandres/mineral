import FloatingActions from "components/FloatingActions";
import { HiReply, HiOutlineTrash } from "react-icons/hi";
import useDeleteNote from "hooks/useDeleteNote";
import { Note } from "types/Note";
import ListItemDate from "components/ListItemDate";
import ColorBall from "components/ColorBall";
import Link from "next/link";

interface Props {
  note: Note;
  disabled?: boolean;
}

const ListItem = (props: Props) => {
  const { note } = props;
  const { id: noteId, deletedAt, title, text } = note;
  const binNote = useDeleteNote(noteId, deletedAt);

  const untitledClass = title ? "" : "text-gray-400 dark:text-gray-500";

  // TO-DO: Fix action on undelete

  const ActionIcon = deletedAt ? HiReply : HiOutlineTrash;

  return (
    <Link
      href={`/note?id=${noteId}`}
      disabled={props.disabled}
      className={`list-group-item group group relative
      w-full
      justify-between rounded
      border border-[var(--border-color)]
      bg-white
      px-2
      py-2 transition
      hover:bg-gray-200 focus:ring-2
      focus:ring-inset disabled:text-gray-400
      disabled:hover:bg-white dark:bg-gray-800
      dark:hover:bg-gray-700 disabled:dark:text-gray-500
      disabled:dark:hover:bg-gray-800
      `}
    >
      <div className="relative flex w-full items-center justify-start">
        <ColorBall color={note.color} small className="mr-2" />
        <div
          className={`title mr-4 w-full
          truncate whitespace-nowrap text-left font-mono
          ${untitledClass}`}
        >
          {title || "(untitled)"}
        </div>
        <ListItemDate date={note.updatedAt} />
      </div>
      <FloatingActions>
        <ActionIcon
          className="h-6 w-6 cursor-pointer rounded-full
          bg-gray-50
          p-1.5 text-gray-800
          transition hover:bg-gray-800 hover:text-gray-200
          dark:bg-gray-300 dark:text-gray-700
          dark:hover:bg-gray-100 dark:hover:text-gray-800"
          onClick={binNote}
        />
      </FloatingActions>
    </Link>
  );
};

export default ListItem;
