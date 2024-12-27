import { useEffect, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { marked } from "marked";

const Description = ({ description = "", collapsed = false }) => {
  const [isCollapsed, setCollapsed] = useState(collapsed);
  if (!description) {
    return null;
  }

  const toggleCollapsed = () => setCollapsed(!isCollapsed);
  const ExpandIcon = isCollapsed ? HiOutlineChevronDown : HiOutlineChevronUp;
  const descriptionClass = isCollapsed ? "h-0 opacity-0" : "h-auto";

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
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const parseMD = async () => {
      const markdown = await marked.parse(text);
      setMarkdown(markdown);
    };

    parseMD();
  }, [text]);

  return (
    <>
      <Description {...restProps} />
      <div className="flex gap-4 border-b border-b-[var(--border-soft-color)] py-4 text-left">
        <div className="raw flex-1 whitespace-pre-wrap font-mono">{text}</div>
        <div
          className="markdown prose viewerarea dark:prose-invert flex-1 p-2"
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      </div>
    </>
  );
};

export default MDExample;
