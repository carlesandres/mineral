import { marked } from 'marked';
import React from 'react';
import { mdStyle } from '@/utils/md-style';
import { Example } from '@/types/Example';
import { cn } from '@/lib/utils';
import FieldLabel from './FieldLabel';

interface ExampleCardExtensionProps extends Example {}

const ExampleCardExtension = (props: ExampleCardExtensionProps) => {
  const { specific_example, long_description } = props;

  if (!long_description && !specific_example) {
    return null;
  }

  // TODO: This <hr> should be a divider, but it will require refactoring
  return (
    <div>
      <hr className="m-6" />
      <div className="flex flex-col gap-4">
        {long_description && (
          <div
            className={cn(mdStyle, 'w-full prose pb-4 mx-2 sm:mx-auto ')}
            dangerouslySetInnerHTML={{
              __html: marked(long_description ?? ''),
            }}
          />
        )}

        {specific_example && (
          <div className="">
            <FieldLabel>Specific example:</FieldLabel>
            <div className={cn(mdStyle, 'w-full prose pb-4 mx-2 sm:mx-auto ')}>
              <pre>
                <code>{specific_example}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExampleCardExtension;
