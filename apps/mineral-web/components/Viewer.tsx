import React, { Ref, MouseEvent } from 'react';
import CloseButton from './CloseButton';
import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import useSettingsStore from '@/hooks/useSettingsStore';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { lineHeightToTwMap } from './LineHeightSlider';

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
  const { gfm, lineHeightRem } = useSettingsStore();
  const lineHeightClass = lineHeightToTwMap[lineHeightRem] || 'leading-normal';

  const remarkPlugins = gfm ? [remarkGfm] : [];

  if (!show) {
    return null;
  }

  const onScrollObj = props.onScrollViewer
    ? { onScroll: props.onScrollViewer }
    : null;

  const closeButtonIcon = props.isEditorOpen ? undefined : <Pencil />;
  const isEmpty = !text || text.trim() === '';
  const defaultText = '(Shift + double-click to edit)';

  // TO-DO: Padding should be based on CSS variable
  return (
    <div className={`viewerarea relative w-full min-w-0 flex-2`}>
      <div
        className={cn(
          `viewer panel-padding prose dark:prose-invert prose-code:before:content-none prose-code:after:content-none print:prose-headings:text-gray-950 print:prose-a:text-gray-950 h-full w-full max-w-none overflow-y-auto pb-12 print:text-gray-950`,
          {
            'text-center text-gray-400 dark:text-gray-400': isEmpty,
          },
          lineHeightClass,
        )}
        ref={ref}
        {...onScrollObj}
        onDoubleClick={props.onDoubleClick}
      >
        <Markdown rehypePlugins={[rehypeSlug]} remarkPlugins={remarkPlugins}>
          {isEmpty ? defaultText : text}
        </Markdown>
      </div>
      <CloseButton onClick={onClose} className="mr-1">
        {closeButtonIcon}
      </CloseButton>
    </div>
  );
});

Viewer.displayName = 'Viewer';

export default Viewer;
