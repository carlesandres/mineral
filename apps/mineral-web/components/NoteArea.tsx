import { useRef, useState, useCallback } from 'react';
import Panes from 'components/Panes';
import EditorToolbar from 'components/EditorToolbar';
import EditorFooter from 'components/EditorFooter';
import HelpModal from 'components/HelpModal';
import ColorSelector from 'components/ColorSelector';
import { Note } from 'types/Note';
import NoteMenu from './NoteMenu';
import { updateNote } from 'hooks/useNotesStore';

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

  console.dir(panels);

  const desiredWidth =
    Number(Boolean(viewer)) * 65 +
    Number(Boolean(editor)) * 65 +
    Number(Boolean(tocReallyShown)) * 32.5;

  const wideClass = wide
    ? 'wide w-full rounded-none m-0'
    : 'dark:md:border max-w-full sm:border';

  const containerWideClass = wide ? '' : 'sm:px-8 sm:py-16 lg:py-32';

  // @media (max-width: 800px) {
  //   .notearea {
  //     width: 100%;
  //     border-radius: 0;
  //     border: none;
  //     margin: 0;
  //   }
  //
  //   .editor-toolbar .actions button.toggle-full-width {
  //     display: none;
  //   }
  // }

  // <style jsx>{`
  //   .normal-mode {
  //     width: ${desiredWidth}ch;
  //   }
  // `}</style>

  return (
    <>
      <HelpModal />
      <div className={`relative flex w-full ${containerWideClass}`}>
        <div
          ref={editorarea}
          className={`notearea relative mx-auto flex w-full flex-col overflow-hidden rounded border-gray-400 bg-red-100 transition-[width] duration-300 dark:border-gray-500 print:border-none ${wideClass} ${style}`}
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
