import React, { Ref, MouseEvent, useState, useEffect } from 'react';
import { marked } from 'marked';
import hilite from 'utils/custom-hilite';
import { HLJSApi } from 'highlight.js';
import PanelLabel from 'components/PanelLabel';
import { FaMarkdown } from 'react-icons/fa';
import useSettingsStore from 'hooks/useSettingsStore';
import DOMPurify from 'dompurify';
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
  const { show, isEditorOpen, onClose, text } = props;
  const [mdContent, setMdcontent] = useState('');
  // TO-DO: Find out how to deal with dompurify types
  const [highlight, setHighlight] = useState<HLJSApi | null>(null);
  const { gfm } = useSettingsStore();
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const parseMD = async () => {
      const markdown = await marked.parse(text);
      console.log('markdown', markdown);
      setMarkdown(markdown);
    };

    parseMD();
  }, [text]);

  useEffect(() => {
    const initPurify = async () => {
      // TO-DO: This and hihjlight.js should be preloaded on other pages
      // so as to speed up loading the first note
      const hljs = await import('highlight.js');
      setHighlight(hljs.default);
    };

    const options = {
      breaks: true,
      highlight: hilite,
      gfm,
    };
    marked.use(options);
    initPurify();
  }, [gfm]);

  useEffect(() => {
    if (props.show) {
      const viewerContent = DOMPurify.sanitize(markdown);
      setMdcontent(viewerContent);
    }
  }, [props.text, props.show, markdown]);

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

  // TO-DO: Padding should be based on CSS variable
  return (
    <div className={`viewerarea flex-2 relative w-full`}>
      <PanelLabel>
        <FaMarkdown />
      </PanelLabel>
      <div
        className={`viewer scrollable is-markdown prose h-full w-full bg-blue-100 p-4 prose-headings:text-[var(--viewer-titles-color)] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[var(--viewer-code-bg-color)]`}
        ref={ref}
        {...onScrollObj}
        onDoubleClick={props.onDoubleClick}
        dangerouslySetInnerHTML={{ __html: mdContent }}
      />
      {isEditorOpen && (
        <CloseButton
          onClick={onClose}
          className="mr-1 text-gray-400 dark:text-gray-500"
        />
      )}
    </div>
  );
});

Viewer.displayName = 'Viewer';

export default Viewer;
