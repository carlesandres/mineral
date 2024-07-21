import React from 'react';
import { marked } from 'marked';
import { cn } from 'utils';

interface MarkdowContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  text: string;
}

const MarkdowContent = (props: MarkdowContentProps) => {
  const { text, className, ...rest } = props;
  return (
    <div
      className={cn(
        `prose 
        prose-code:bg-yellow-200 prose-code:text-gray-700 
        prose-code:py-1 prose-code:px-2 prose-code:rounded 
        prose-code:justify-center
        prose-pre:bg-gray-100 w-full flex-1
        [&:nth-child(3n+1)]:prose-code:bg-blue-100
        [&:nth-child(3n+2)]:prose-code:bg-red-100
        prose-code:before:content-none prose-code:after:content-none
        overflow-auto text-base leading-6 sm:leading-8 `,
        className,
      )}
      dangerouslySetInnerHTML={{ __html: marked(text) }}
      {...rest}
    />
  );
};

export default MarkdowContent;
