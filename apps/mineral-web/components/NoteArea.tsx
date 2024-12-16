import { useRef, useState, useCallback } from 'react';
import Panes from 'components/Panes';
import EditorToolbar from 'components/EditorToolbar';
import EditorFooter from 'components/EditorFooter';
import HelpModal from 'components/HelpModal';
import ColorSelector from 'components/ColorSelector';
import { useList } from 'hooks/useList';
import { Note } from 'types/Note';
import NoteMenu from './NoteMenu';

interface Props {
  note: Note;
  onPrint: () => void;
  onChangeTitle: (title: string) => void;
  onRotatePanels: () => void;
}

const NoteArea = (props: Props) => {
  const [displayColorModal, setDisplaycolormodal] = useState(false);
  const { dispatchList } = useList();
  const editorarea = useRef();
  const { note } = props;
  const noteId = note?.id;
  const editorRef = useRef<HTMLTextAreaElement>();

  const showColorModal = () => setDisplaycolormodal(true);
  const hideColorModal = () => setDisplaycolormodal(false);

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Enter" && e.ctrlKey) {
  //       onRotatePanels();
  //       return;
  //     }
  //     if (e.key === "t" && e.ctrlKey) {
  //       const { text } = note;
  //       const newText =
  //         text +
  //         "aaa | bbb | ccc\n--|---|---\n1 | 2 | 3\n4 | 5 | 6\n7 | 8 | 9\n";
  //       dispatchList({
  //         type: "merge",
  //         id: noteId,
  //         partial: { text: newText },
  //       });
  //       return;
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);
  //
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [onRotatePanels, note, noteId, dispatchList]);

  const changeColor = useCallback(
    (color: string) => {
      dispatchList({
        type: 'merge',
        id: noteId,
        partial: { color },
      });
      hideColorModal();
    },
    [noteId, dispatchList],
  );

  const toggleFooter = useCallback(() => {
    const { showFooter, id } = note;
    dispatchList({
      type: 'merge',
      id,
      partial: { showFooter: !showFooter },
    });
  }, [note, dispatchList]);

  if (!note) {
    return null;
  }

  const { style, wide, panels } = note;
  const { viewer, editor, toc } = panels;
  const tocReallyShown = toc && viewer;

  const desiredWidth =
    Number(Boolean(viewer)) * 75 +
    Number(Boolean(editor)) * 75 +
    Number(Boolean(tocReallyShown)) * 37;

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
      <ColorSelector
        show={displayColorModal}
        onClose={hideColorModal}
        onChange={changeColor}
        selectedColor={note?.color}
      />
      <HelpModal />
      <div className={`relative flex w-full ${containerWideClass}`}>
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
          <EditorFooter
            {...note}
            onClickColorBall={showColorModal}
            onToggle={toggleFooter}
          />
          <NoteMenu noteId={note.id} />
        </div>
      </div>
    </>
  );
};

export default NoteArea;
