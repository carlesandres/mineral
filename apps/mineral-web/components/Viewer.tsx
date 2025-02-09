import React, { Ref, MouseEvent } from 'react';
import CloseButton from './CloseButton';
import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import useSettingsStore from '@/hooks/useSettingsStore';

interface Props {
  text: string;
  show: boolean;
  onScrollViewer: (event: MouseEvent<HTMLDivElement>) => void;
  onDoubleClick: (event: MouseEvent<HTMLDivElement>) => void;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  isEditorOpen: boolean;
}

const Viewer = React.forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  const { show, onClose, text } = props;
  const { gfm } = useSettingsStore();

  const remarkPlugins = gfm ? [remarkGfm] : [];

  if (!show) {
    return null;
  }

  const onScrollObj = props.onScrollViewer
    ? { onScroll: props.onScrollViewer }
    : null;

  // TO-DO: Padding should be based on CSS variable
  return (
    <div
      className={`viewerarea panel-padding relative w-full min-w-0 flex-[2] overflow-x-hidden`}
    >
      <div
        className={`viewer scrollable prose h-full w-full max-w-none dark:prose-invert prose-code:before:content-none prose-code:after:content-none print:text-gray-950 print:prose-headings:text-gray-950 print:prose-a:text-gray-950`}
        ref={ref}
        {...onScrollObj}
        onDoubleClick={props.onDoubleClick}
      >
        <Markdown rehypePlugins={[rehypeSlug]} remarkPlugins={remarkPlugins}>
          {text}
        </Markdown>
      </div>
      <CloseButton
        onClick={onClose}
        className="mr-1 text-gray-400 dark:text-gray-500"
      />
    </div>
  );
});

Viewer.displayName = 'Viewer';

export default Viewer;
