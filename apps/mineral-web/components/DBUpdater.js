import { useRef, useCallback } from 'react';
import { useList } from 'hooks/useList';
import { debounce, differenceWith } from 'lodash';
import { saveFile, wipeOutDeleted } from 'utils/fileUtils';

const DBUpdater = () => {
  const { list } = useList();
  const prevNotesRef = useRef();

  const saveNoteThrottled = useCallback(debounce(saveFile, 200), [
    debounce,
    saveFile,
  ]);

  if (list.initialized) {
    if (prevNotesRef.current) {
      // Find removed elements, i.e. elements that appeared in prevNotes but
      // not in current notes. It's important that the comprator only compares
      // ids. Otherwise, we would end up considered 'removed' a file that
      // is only 'changed'
      const removedFiles = differenceWith(
        prevNotesRef.current,
        list.notes,
        (note1, note2) => note1.id === note2.id
      );
      if (removedFiles.length) {
        wipeOutDeleted(removedFiles);
      }

      const changedFiles = differenceWith(list.notes, prevNotesRef.current);
      changedFiles.forEach(saveNoteThrottled);
    }

    prevNotesRef.current = [...list.notes];
  }

  return null;
};

export default DBUpdater;
