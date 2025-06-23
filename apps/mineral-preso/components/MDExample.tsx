import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRemark } from 'react-remark';

const Description = ({ description = '', collapsed = false }) => {
  const [isCollapsed, setCollapsed] = useState(collapsed);
  if (!description) {
    return null;
  }

  const toggleCollapsed = () => setCollapsed(!isCollapsed);
  const ExpandIcon = isCollapsed ? ChevronDown : ChevronUp;
  const descriptionClass = isCollapsed ? 'h-0 opacity-0' : 'h-auto';

  return (
    <div className={`description flex gap-4 overflow-hidden py-4`}>
      <ExpandIcon onClick={toggleCollapsed} />
      <p className={`${descriptionClass} text-sm`}>{description}</p>
    </div>
  );
};

interface MDExampleProps {
  text: string;
  description?: string;
  collapsed?: boolean;
}

const MDExample = (props: MDExampleProps) => {
  const { text, ...restProps } = props;
  const [markdown, setMarkdown] = useRemark();

  useEffect(() => {
    setMarkdown(text);
  }, [text, setMarkdown]);

  return (
    <>
      <Description {...restProps} />
      <div className="flex gap-4 border-b py-4 text-left">
        <div className="raw flex-1 whitespace-pre-wrap font-mono">{text}</div>
        <div className="markdown viewerarea prose flex-1 p-2 dark:prose-invert">
          {markdown}
        </div>
      </div>
    </>
  );
};

export default MDExample;
