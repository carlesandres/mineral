import { useState, useEffect } from 'react';
import NoteRow from 'components/NoteRow';
import { Note } from 'types/Note';
import { getShownFiles } from 'utils/fileUtils';
import { sortBy } from 'lodash';

interface BiewViewProps {
  notes: Note[];
  searchTerm: string;
}

const BinView = (props: BiewViewProps) => {
  const [initialised, setInitialised] = useState(false);
  const [shownNotes, setFilestoshow] = useState<Note[]>([]);
  const { notes, searchTerm } = props;

  // TO-DO: Debounce this (maybe)?
  useEffect(() => {
    const shownNotes = getShownFiles(notes, 'BIN', searchTerm);
    const sortedNotes = sortBy(shownNotes, 'updatedAt').reverse();
    setFilestoshow([...sortedNotes]);
    setInitialised(true);
  }, [notes, searchTerm]);

  if (!notes.length) {
    return <p className="py-4 text-center">Your Bin is empty.</p>;
  }

  let content: React.ReactNode;

  if (!initialised) {
    return null;
  }

  const isEmpty = !shownNotes.length;
  if (isEmpty) {
    const message = searchTerm.trim() ? ' matching your search' : '';
    content = (
      <p className="py-4 text-center">
        {`There are no binned notes${message}.`}
      </p>
    );
  } else {
    // TO-DO: MIssing disabled prop on ListItem
    content = shownNotes.map((note) => <NoteRow key={note.id} note={note} />);
  }

  return (
    <div className="file-list mb-32 flex flex-1 flex-shrink-0 flex-col gap-2 pb-4 text-sm">
      {content}
    </div>
  );
};

export default BinView;
