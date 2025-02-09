import { MouseEvent, useEffect, useState } from 'react';
import { remark } from 'remark';
import { extractHeadings, Heading } from '@/utils/extract-headings';
import CloseButton from './CloseButton';
import DynamicHeading from './dynamic-heading';

interface TOCProps {
  show: boolean;
  text?: string;
  onClose: () => void;
  onDoubleClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const TOC = (props: TOCProps) => {
  const { text: content = '', onClose, onDoubleClick, show } = props;
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Process the content and extract headings
    const processor = remark().use(extractHeadings);
    const file = processor.processSync(content);
    const headings: Heading[] = (file.data as any).headings || [];
    setHeadings(headings);
  }, [content]);

  if (!show) return null;

  return (
    <div
      className="toc relative h-full w-full min-w-0 flex-1 bg-[var(--viewer-bg-color)] print:hidden"
      onDoubleClick={onDoubleClick}
    >
      <CloseButton onClick={onClose} />
      <div className="toc-content flex flex-col px-8 pt-8">
        {headings.map((heading) => (
          <DynamicHeading key={heading.id} level={heading.depth}>
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

export default TOC;
