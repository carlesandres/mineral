import React, { useCallback, MouseEvent, UIEvent } from 'react';
import TOC from 'components/TOC';
import Viewer from 'components/Viewer';
import Editor from 'components/Editor';
import { useEffect, useRef } from 'react';
import { useList } from 'hooks/useList';
import { PanelsPartial, Panels, Note } from 'types/Note';

// TODO: Adding the same listener to both panels, makes the onScroll
// method to be triggered on both on any scroll action
const onScroll = (event, slave) => {
  if (slave) {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const slaveHeight = slave.clientHeight;
    const slaveOffsetHeight = slave.scrollHeight;
    const scrollPercent = scrollTop / (clientHeight - scrollHeight);
    const slaveScroll = Math.round(
      scrollPercent * (slaveHeight - slaveOffsetHeight),
    );
    slave.scrollTop = slaveScroll;
  }
};

interface Props extends Note {
  editorRef: React.RefObject<HTMLTextAreaElement | null>;
}

const Panes = (props: Props) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const { text, panels = {}, editorRef } = props;
  const { viewer = false, editor = false, toc = false } = panels as Panels;
  const { dispatchList } = useList();
  const noteId = props.id;

  const updatePanels = useCallback(
    (panels: PanelsPartial) =>
      dispatchList({
        type: 'merge-panels',
        id: noteId,
        panels,
      }),
    [noteId, dispatchList],
  );

  const switchToWriteOnly = useCallback(
    () => updatePanels({ editor: true, viewer: false }),
    [updatePanels],
  );

  const switchToReadOnly = useCallback(
    () => updatePanels({ editor: false, viewer: true }),
    [updatePanels],
  );
  const switchToTwoPanes = useCallback(
    () => updatePanels({ editor: true, viewer: true }),
    [updatePanels],
  );

  const closeTOC = useCallback(
    () => updatePanels({ toc: false }),
    [updatePanels],
  );

  const toggleViewer = useCallback(() => {
    if (viewer) {
      switchToWriteOnly();
    } else {
      switchToTwoPanes();
    }
  }, [viewer, switchToWriteOnly, switchToTwoPanes]);

  useEffect(() => {
    const scrollToTop = () => {
      const editor = editorRef?.current;
      if (editor) {
        editor.scrollTop = 0;
      }
    };

    scrollToTop();
  }, [editorRef]);

  const handleDoubleClickEditor = (event: MouseEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      switchToReadOnly();
    }

    if (event.metaKey) {
      event.preventDefault();
      event.stopPropagation();
      if (viewer) {
        switchToWriteOnly();
        return;
      }
      switchToTwoPanes();
    }
  };

  const handleViewerDoubleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      switchToWriteOnly();
    }

    if (event.metaKey) {
      event.preventDefault();
      event.stopPropagation();
      toggleViewer();
    }
  };

  const onScrollEditor = (event: UIEvent<HTMLTextAreaElement>) => {
    const slave = viewerRef?.current;
    onScroll(event, slave);
  };

  const onScrollViewer = (event: MouseEvent<HTMLDivElement>) => {
    // Do not scroll if inside <pre> which is also scrollable
    if (event.target === event.currentTarget) {
      const slave = editorRef?.current;
      onScroll(event, slave);
    }
  };

  const reallyShowToc = toc && viewer;

  return (
    <div className="editor-wrap align-stretch flex flex-1 flex-col divide-y divide-[var(--border-soft-color)] sm:flex-row sm:divide-x sm:divide-y-0 print:divide-none">
      <TOC
        onClose={closeTOC}
        show={reallyShowToc}
        text={text}
        onDoubleClick={handleViewerDoubleClick}
      />
      <Editor
        {...props}
        ref={editorRef}
        onScrollEditor={onScrollEditor}
        onDoubleClick={handleDoubleClickEditor}
        onClose={switchToReadOnly}
      />
      <Viewer
        ref={viewerRef}
        show={viewer}
        isEditorOpen={editor}
        text={text}
        onScrollViewer={onScrollViewer}
        onDoubleClick={handleViewerDoubleClick}
        onClose={switchToWriteOnly}
      />
    </div>
  );
};

export default Panes;
