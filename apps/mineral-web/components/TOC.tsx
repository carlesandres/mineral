/* eslint react/no-danger: 0 */
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
      className="toc no-print relative flex flex-1 
      flex-col w-full h-full bg-yellow-100
        overflow-hidden bg-[var(--viewer-bg-color)]"
      onDoubleClick={onDoubleClick}
    >
      <CloseButton onClick={props.onClose} />
      <PanelLabel>
        <HiMenuAlt2 />
      </PanelLabel>
      <div className="toc-content flex-1 overflow-auto px-8 pt-8 text-blue-700 text-[color:var(--viewer-titles-color)]">
        <div dangerouslySetInnerHTML={{ __html: tocMarkdown }} />
      </div>
    </div>
  );
};

export default TOC;
