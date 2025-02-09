import NoteArea from 'components/NoteArea';
import { useCallback } from 'react';
import { Note, PanelsPartial } from 'types/Note';
import { updateNote } from 'hooks/useNotesStore';

interface Props {
  note: Note;
}

const NoteContainer = (props: Props) => {
  const { note } = props;
  const noteId = note?.id;

  const editTitle = useCallback(
    (title: string) => updateNote(noteId, { title }),
    [noteId],
  );

  const rotatePanels = useCallback(() => {
    const { viewer, editor } = note.panels;
    let nextPanels: PanelsPartial;
    if (viewer && editor) {
      nextPanels = { viewer: true, editor: false };
    } else if (viewer) {
      nextPanels = { viewer: false, editor: true };
    } else {
      nextPanels = { viewer: true, editor: true };
    }

    const panels = { ...note.panels, ...nextPanels };
    updateNote(noteId, { panels });
  }, [noteId, note.panels]);

  const onPrint = () => window.print();

  return (
    <NoteArea
      note={note}
      onChangeTitle={editTitle}
      onPrint={onPrint}
      onRotatePanels={rotatePanels}
    />
  );
};

export default NoteContainer;
