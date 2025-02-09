import React, { Ref, MouseEvent } from 'react';
import PanelLabel from 'components/PanelLabel';
// import useSettingsStore from 'hooks/useSettingsStore';
import CloseButton from './CloseButton';
import { Eye } from 'lucide-react';
import RenderMD from './RenderMD';

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
  // TO-DO: Find out how to deal with dompurify types
  // const { gfm } = useSettingsStore();

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
      <PanelLabel>
        <Eye size={16} />
      </PanelLabel>
      <div
        className={`viewer scrollable prose h-full w-full dark:prose-invert prose-code:before:content-none prose-code:after:content-none print:text-gray-950 print:prose-headings:text-gray-950 print:prose-a:text-gray-950`}
        ref={ref}
        {...onScrollObj}
        onDoubleClick={props.onDoubleClick}
      >
        <RenderMD markdown={text} />
      </div>
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
