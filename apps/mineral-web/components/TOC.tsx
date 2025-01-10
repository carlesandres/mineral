import { MouseEvent } from 'react';
import { tocRenderer } from 'components/markedRenderers';
import CloseButton from 'components/CloseButton';
import PanelLabel from './PanelLabel';
import { Logs } from 'lucide-react';

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
        <Logs />
      </PanelLabel>
      <div className="toc-content px-8 pt-8">
        <div dangerouslySetInnerHTML={{ __html: tocMarkdown }} />
      </div>
    </div>
  );
};

export default TOC;
