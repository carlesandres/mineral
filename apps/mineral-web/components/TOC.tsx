import { MouseEvent } from 'react';
import { tocRenderer } from 'components/markedRenderers';
import CloseButton from 'components/CloseButton';
import PanelLabel from './PanelLabel';
import { HiMenuAlt2 } from 'react-icons/hi';

interface TOCProps {
  show: boolean;
  text?: string;
  onClose: () => void;
  onDoubleClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const TOC = (props: TOCProps) => {
  const { show, text = '', onDoubleClick } = props;

  if (!show) {
    return null;
  }

  const tocMarkdown = tocRenderer(text);

  return (
    <div
      className="toc no-print relative h-full w-full min-w-0 flex-1 bg-[var(--viewer-bg-color)]"
      onDoubleClick={onDoubleClick}
    >
      <CloseButton onClick={props.onClose} />
      <PanelLabel>
        <HiMenuAlt2 />
      </PanelLabel>
      <div className="toc-content px-8 pt-8 text-[color:var(--viewer-titles-color)] text-blue-700">
        <div dangerouslySetInnerHTML={{ __html: tocMarkdown }} />
      </div>
    </div>
  );
};

export default TOC;
