import NoteArea from 'components/NoteArea';
import noteShortcuts from 'components/noteShortcuts';
import { goToList, goToNewFile, goToSettings } from 'utils/navigationHelpers';
import { useEffect, useCallback, useRef } from 'react';
import { useList } from 'hooks/useList';
import { useShortcuts } from 'hooks/useShortcuts';
import useSettingsStore, { setSetting } from 'utils/useSettingsStore';
import { useRouter } from 'next/router';
import useDeleteNote from 'hooks/useDeleteNote';
import 'highlight.js/styles/github-dark.css';
import 'highlight.js/styles/github.css';
import { NotePartial, Note, PanelsPartial } from 'types/Note';

interface Props {
  note: Note;
}

const NoteContainer = (props: Props) => {
  const { dispatchList } = useList();
  const { dispatch: dispatchShortcuts } = useShortcuts();
  const router = useRouter();
  const { note } = props;
  const { darkMode } = useSettingsStore();
  const darkStyleRef = useRef<HTMLStyleElement | null>(null);
  const lightStyleRef = useRef<HTMLStyleElement | null>(null);
  const noteId = note?.id;
  const binNote = useDeleteNote(noteId, note?.deletedAt);

  useEffect(() => {
    const xpathLight = `//style[contains(text(),'github-syntax-light')]`;
    const lightStyleEl = document.evaluate(
      xpathLight,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
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
      null
    ).singleNodeValue as HTMLStyleElement;
    if (darkStyleEl) {
      darkStyleRef.current = darkStyleEl;
    }
  }, []);

  useEffect(() => {
    const isNowDark = darkMode;
    const active = isNowDark ? lightStyleRef.current : darkStyleRef.current;
    const inactive = isNowDark ? darkStyleRef.current : lightStyleRef.current;
    if (active) {
      active.setAttribute('media', 'not all');
    }
    if (inactive) {
      inactive.removeAttribute('media');
    }
  }, [darkMode]);

  const updateNote = useCallback(
    (partial: NotePartial) =>
      dispatchList({
        type: 'merge',
        partial,
        id: noteId,
      }),
    [noteId]
  );

  const updatePanels = useCallback(
    (panels: PanelsPartial) =>
      dispatchList({
        type: 'merge-panels',
        id: noteId,
        panels,
      }),
    [noteId]
  );

  const editTitle = useCallback(
    (title: string) => updateNote({ title }),
    [updateNote]
  );

  const goToSlide = useCallback(() => {
    if (note?.id) {
      router.push(`/slides/id=${noteId}`);
    }
  }, [noteId]);

  const toggleFullWidth = useCallback(
    () =>
      dispatchList({
        type: 'merge',
        partial: { wide: !note?.wide },
        id: noteId,
      }),
    [noteId, note?.wide]
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
    dispatchList({
      type: 'merge',
      id: noteId,
      partial: { panels },
    });
  }, [dispatchList, noteId, note.panels]);

  // TO-DO: Simplify this ffect by extracting most of the code out
  useEffect(() => {
    const toggleToc = () => updatePanels({ toc: !note?.panels?.toc });
    const nextStyle = () => dispatchList({ type: 'rotate-style' });

    const keyActionMap = {
      d: binNote,
      s: goToSlide,
      r: {
        action: () => setSetting('darkMode', !darkMode),
      },
      e: rotatePanels,
      // m: showMDHelp,
      c: nextStyle,
      p: onPrint,
      n: goToNewFile,
      l: goToList,
      k: goToSettings,
      // x: props?.confirmExportCurrentFile,
      w: toggleFullWidth,
      t: toggleToc,
    };

    dispatchShortcuts({
      type: 'set',
      keyActionMap,
      shortcutDescription: noteShortcuts,
    });
  }, [
    dispatchShortcuts,
    dispatchList,
    binNote,
    goToSlide,
    note?.panels?.toc,
    rotatePanels,
    updatePanels,
    toggleFullWidth,
    router,
    darkMode,
  ]);

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
