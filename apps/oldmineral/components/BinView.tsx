import { useState, useEffect, useCallback } from 'react';
import ListItem from 'components/ListItem';
import { Note } from 'types/Note';
import throttle from 'lodash/throttle';
import { getShownFiles } from 'utils/fileUtils.js';
import { sortBy } from 'lodash';
import Label from 'components/Label';

interface BiewViewProps {
  notes: Note[];
  searchTerm: string;
}

const BinView = (props: BiewViewProps) => {
  const [initialised, setInitialised] = useState(false);
  const [shownNotes, setFilestoshow] = useState([]);
  const { notes, searchTerm } = props;
  const throttledSetFiles = useCallback(throttle(setFilestoshow, 200), []);

  useEffect(() => {
    const shownNotes = getShownFiles(notes, 'BIN', searchTerm);
    const sortedNotes = sortBy(shownNotes, 'updatedAt').reverse();
    throttledSetFiles([...sortedNotes]);
    setInitialised(true);
  }, [notes, searchTerm, throttledSetFiles]);

  if (!notes.length) {
    return <p className="py-4 text-center">Your Bin is empty.</p>;
  }

  let content: React.ReactNode;

  if (!initialised) {
    return null;
  }

  if (!shownNotes.length) {
    content = (
      <p className="py-4 text-center">
        There are no binned notes matching your search
      </p>
    );
  } else {
    content = shownNotes.map((note) => (
      <ListItem disabled key={note.id} note={note} />
    ));
  }

  return (
    <>
      <div className="mb-2 flex w-full justify-between px-2">
        <Label>Title</Label>
        <Label>Deleted</Label>
      </div>
      <div
        className="file-list mb-32 flex flex-1 flex-shrink-0 flex-col gap-2
        pb-4 text-sm
        "
      >
        {content}
      </div>
    </>
  );
};

export default BinView;
