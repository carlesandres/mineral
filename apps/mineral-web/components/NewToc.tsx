import { MouseEvent } from 'react';
import { remark } from 'remark';
import { extractHeadings, Heading } from '@/utils/extract-headings';
import { Logs } from 'lucide-react';
import CloseButton from './CloseButton';
import PanelLabel from './PanelLabel';
import DynamicHeading from './dynamic-heading';

interface TOCProps {
  show: boolean;
  text?: string;
  onClose: () => void;
  onDoubleClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const NewToc = (props: TOCProps) => {
  const { text: content = '', onClose, onDoubleClick, show } = props;

  // Process the content and extract headings
  const processor = remark().use(extractHeadings);
  const file = processor.processSync(content);
  const headings: Heading[] = (file.data as any).headings || [];

  if (!show) return null;

  console.log('headings', headings);

  return (
    <div
      className="toc no-print relative h-full w-full min-w-0 flex-1 bg-[var(--viewer-bg-color)]"
      onDoubleClick={onDoubleClick}
    >
      <CloseButton onClick={onClose} />
      <PanelLabel>
        <Logs />
      </PanelLabel>
      <div className="toc-content flex flex-col px-8 pt-8">
        {headings.map((heading) => (
          <DynamicHeading
            key={heading.id}
            level={heading.depth}
            id={heading.id}
          >
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`toc-item depth-${heading.depth}`}
            >
              {heading.text}
            </a>
          </DynamicHeading>
        ))}
      </div>
    </div>
  );
};

export default NewToc;
