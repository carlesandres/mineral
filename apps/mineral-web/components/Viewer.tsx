import React, { Ref, MouseEvent, useState, useEffect } from 'react';
import { marked } from 'marked';
import { viewerRenderer } from 'components/markedRenderers';
import hilite from 'utils/custom-hilite.js';
import { HLJSApi } from 'highlight.js';
import PanelLabel from 'components/PanelLabel';
import { FaMarkdown } from 'react-icons/fa';
import useSettingsStore from 'utils/useSettingsStore';
import { sanitize } from 'dompurify';
import CloseButton from './CloseButton';

interface Props {
  text: string;
  show: boolean;
  onScrollViewer: (event: MouseEvent<HTMLDivElement>) => void;
  onDoubleClick: (event: MouseEvent<HTMLDivElement>) => void;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  isEditorOpen: boolean;
}

const Viewer = React.forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  const { show, isEditorOpen, onClose } = props;
  const [mdContent, setMdcontent] = useState('');
  // TO-DO: Find out how to deal with dompurify types
  const [highlight, setHighlight] = useState<HLJSApi | null>(null);
  const { gfm } = useSettingsStore();

  useEffect(() => {
    const initPurify = async () => {
      // TO-DO: This and hihjlight.js should be preloaded on other pages
      // so as to speed up loading the first note
      const hljs = await import('highlight.js');
      setHighlight(hljs.default);
    };

    const options = {
      renderer: viewerRenderer,
      breaks: true,
      highlight: hilite,
      gfm,
    };
    marked.use(options);
    initPurify();
  }, [gfm]);

  useEffect(() => {
    if (props.show) {
      const viewerContent = sanitize(marked.parse(props.text), {
        ALLOWED_ATTR: ['target', 'href', 'id', 'name', 'type'],
      });
      setMdcontent(viewerContent);
    }
  }, [props.text, props.show]);

  useEffect(() => {
    if (highlight && show) {
      highlight.highlightAll();
    }
  }, [highlight, show, mdContent]);

  if (!props.show) {
    return null;
  }

  const onScrollObj = props.onScrollViewer
    ? { onScroll: props.onScrollViewer }
    : null;

  return (
    <div className={`viewerarea flex-2`}>
      <PanelLabel>
        <FaMarkdown />
      </PanelLabel>
      <div
        className="viewer-content scrollable is-markdown prose
        prose-code:before:content-none
        prose-headings:text-[var(--viewer-titles-color)]
        prose-pre:bg-[var(--viewer-code-bg-color)]
        prose-code:after:content-none max-w-full"
        ref={ref}
        {...onScrollObj}
        onDoubleClick={props.onDoubleClick}
        dangerouslySetInnerHTML={{ __html: mdContent }}
      />
        {isEditorOpen && (
          <CloseButton
            onClick={onClose}
            className="mr-1 text-gray-400 dark:text-gray-500 "
          />
        )}
    </div>
  );
});

Viewer.displayName = 'Viewer';

export default Viewer;
