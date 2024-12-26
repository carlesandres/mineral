import ListItem from 'components/ListItem';
import { useState, useEffect } from 'react';
import { getShownFiles } from 'utils/fileUtils';
import { sortBy } from 'lodash';
import { Note } from 'types/Note';
import Label from 'components/Label';

interface ListElementProps {
  notes: Note[];
  searchTerm: string;
}

const ListElements = (props: ListElementProps) => {
  const [initialised, setInitialised] = useState(false);
  const [shownFiles, setFilestoshow] = useState<Note[]>([]);
  const [subset, setSubset] = useState(true);
  const { notes, searchTerm } = props;

  useEffect(() => {
    const shownFiles = getShownFiles(notes, 'INBOX', searchTerm);
    setFilestoshow([...shownFiles]);
    setInitialised(true);
  }, [notes, searchTerm]);

  // Only show a subset of all files on first render to speed rendering up
  useEffect(() => setSubset(false), []);

  if (!initialised) {
    return null;
  }

  if (!shownFiles.length) {
    return (
      <div className="py-4 text-center">
        <div className="mb-2">
          {`There are no active notes matching:`}
          <span className="ml-2 font-bold">{searchTerm}</span>
        </div>
      </div>
    );
  }

  const elsToRender = subset ? shownFiles.slice(0, 20) : shownFiles;
  // TO-DO: This could probably be moved to the getShownFiles function
  const elsToRenderSorted = sortBy(elsToRender, 'updatedAt').reverse();

  const listItems = elsToRenderSorted.map((note) => {
    return <ListItem key={note.id} note={note} />;
  });

  return (
    <div className="list-content mb-32 pt-2">
      <div className="mb-3 flex w-full justify-between px-1.5">
        <Label>Title</Label>
        <Label>Last updated</Label>
      </div>
      <div className="file-list m text- flex flex-1 flex-shrink-0 flex-col gap-2">
        {listItems}
      </div>
    </div>
  );
};

export default ListElements;
