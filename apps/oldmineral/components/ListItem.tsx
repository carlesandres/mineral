import FloatingActions from 'components/FloatingActions';
import { HiReply, HiOutlineTrash } from 'react-icons/hi';
import { useRef, useCallback, useState } from 'react';
import { goToNote } from 'utils/navigationHelpers';
import Tooltip from 'components/Tooltip';
import useDeleteNote from 'hooks/useDeleteNote';
import { Note } from 'types/Note';
import ListItemDate from 'components/ListItemDate';
import ColorBall from 'components/ColorBall';

interface Props {
  note: Note;
  disabled?: boolean;
}

const ListItem = (props: Props) => {
  const { note } = props;
  const { id: noteId, deletedAt, title, text } = note;
  const elem = useRef();
  const [showTooltip, setShowTooltip] = useState(false);
  const binNote = useDeleteNote(noteId, deletedAt);

  const untitledClass = title ? '' : 'text-gray-400 dark:text-gray-500';

  const isDeleted = !!note.deletedAt;
  const unDelete = () => {};
  const openNote = useCallback(() => goToNote(noteId), [noteId]);

  const action = isDeleted ? unDelete : openNote;

  const ActionIcon = deletedAt ? HiReply : HiOutlineTrash;

  return (
    <button
      onClick={action}
      ref={elem}
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
      onPointerEnter={() => setShowTooltip(true)}
      onPointerLeave={() => setShowTooltip(false)}
    >
      <div className="relative flex w-full items-center justify-start">
        <ColorBall color={note.color} small className="mr-2" />
        <div
          className={`title mr-4 w-full
          truncate whitespace-nowrap text-left font-mono
          ${untitledClass}`}
        >
          {title || '(untitled)'}
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
      <Tooltip
        show={showTooltip}
        text={text}
        disabled={props.disabled}
        className="top-12 right-48 z-20 ml-48 "
      />
    </button>
  );
};

export default ListItem;
