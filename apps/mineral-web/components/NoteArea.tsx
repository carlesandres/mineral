import { useRef, useCallback } from 'react';
import Panes from 'components/Panes';
import EditorToolbar from 'components/EditorToolbar';
import EditorFooter from 'components/EditorFooter';
import HelpModal from 'components/HelpModal';
import { Note } from 'types/Note';
import NoteMenu from './NoteMenu';
import { updateNote } from 'hooks/useNotesStore';
import { cn } from 'lib/utils';

interface Props {
  note: Note;
  onPrint: () => void;
  onChangeTitle: (title: string) => void;
  onRotatePanels: () => void;
}

const NoteArea = (props: Props) => {
  const editorarea = useRef<HTMLDivElement | null>(null);
  const { note } = props;
  const noteId = note?.id;
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleFooter = useCallback(() => {
    const { showFooter } = note;
    updateNote(note.id, { showFooter: !showFooter });
  }, [note]);

  if (!note) {
    return null;
  }

  const { style, wide, panels } = note;
  const { viewer, editor, toc } = panels;
  const tocReallyShown = toc && viewer;

  const desiredWidth =
    Number(Boolean(viewer)) * 65 +
    Number(Boolean(editor)) * 65 +
    Number(Boolean(tocReallyShown)) * 26;

  const bothMainPanes = viewer && editor;
  const threePanes = bothMainPanes && tocReallyShown;

  const wideClass = wide
    ? 'wide w-full rounded-none m-0'
    : 'dark:md:border max-w-full sm:border';

  const containerWideClass = wide ? '' : 'sm:px-8 sm:py-16 lg:py-32';

  return (
    <>
      <HelpModal />
      <div
        className={cn(`group relative flex w-full ${containerWideClass}`, {
          'both-panes': bothMainPanes,
          'three-panes': threePanes,
        })}
      >
        <div
          ref={editorarea}
          className={`notearea relative mx-auto flex w-full flex-col overflow-hidden rounded border-gray-400 transition-[width] duration-300 dark:border-gray-500 print:border-none ${wideClass} ${style}`}
          style={{ width: `${desiredWidth}ch` }}
        >
          <EditorToolbar
            note={note}
            onChange={props.onChangeTitle}
            editorRef={editorRef}
          />
          <Panes {...note} editorRef={editorRef} />
          <EditorFooter {...note} onToggle={toggleFooter} />
          <div className="absolute right-0 top-0">
            <NoteMenu noteId={note.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteArea;
