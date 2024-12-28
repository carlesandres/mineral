import NoteArea from 'components/NoteArea';
import { useEffect, useCallback, useRef } from 'react';
import 'highlight.js/styles/github-dark.css';
import 'highlight.js/styles/github.css';
import { Note, PanelsPartial } from 'types/Note';
import { updateNote } from 'hooks/useNotesStore';

interface Props {
  note: Note;
}

const NoteContainer = (props: Props) => {
  const { note } = props;
  const darkStyleRef = useRef<HTMLStyleElement | null>(null);
  const lightStyleRef = useRef<HTMLStyleElement | null>(null);
  const noteId = note?.id;

  useEffect(() => {
    const xpathLight = `//style[contains(text(),'github-syntax-light')]`;
    const lightStyleEl = document.evaluate(
      xpathLight,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue as HTMLStyleElement;
    if (lightStyleEl) {
      lightStyleRef.current = lightStyleEl;
    }
    const xpathDark = `//style[contains(text(),'github-syntax-dark')]`;
    const darkStyleEl = document.evaluate(
      xpathDark,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue as HTMLStyleElement;
    if (darkStyleEl) {
      darkStyleRef.current = darkStyleEl;
    }
  }, []);

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

  // // TO-DO: Simplify this ffect by extracting most of the code out
  // useEffect(() => {
  //   const toggleToc = () => updatePanels({ toc: !note?.panels?.toc });
  //   const nextStyle = () => dispatchList({ type: 'rotate-style' });
  //
  //   const keyActionMap = {
  //     d: binNote,
  //     s: goToSlide,
  //     r: {
  //       action: () => setSetting('darkMode', !darkMode),
  //     },
  //     e: rotatePanels,
  //     // m: showMDHelp,
  //     c: nextStyle,
  //     p: onPrint,
  //     n: goToNewFile,
  //     l: goToList,
  //     k: goToSettings,
  //     // x: props?.confirmExportCurrentFile,
  //     w: toggleFullWidth,
  //     t: toggleToc,
  //   };
  //
  //   dispatchShortcuts({
  //     type: 'set',
  //     keyActionMap,
  //     shortcutDescription: noteShortcuts,
  //   });
  // }, [
  //   dispatchShortcuts,
  //   dispatchList,
  //   binNote,
  //   goToSlide,
  //   note?.panels?.toc,
  //   rotatePanels,
  //   updatePanels,
  //   toggleFullWidth,
  //   router,
  //   darkMode,
  // ]);
  //
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
