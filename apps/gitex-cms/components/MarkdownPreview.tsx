import { cn } from '@/lib/utils';
import { marked } from 'marked';
import React from 'react';

interface MarkDownPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

const defaultClassName = `
p-4 max-h-[80vh] overflow-y-auto 
  prose prose-headings:mt-8 prose-headings:font-semibold 
prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl 
prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl 
prose-h6:text-lg dark:prose-headings:text-white`;

const MarkDownPreview = (props: MarkDownPreviewProps) => {
  const { text, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(defaultClassName, className)}
      dangerouslySetInnerHTML={{
        __html: marked(text),
      }}
    />
  );
};

export default MarkDownPreview;
