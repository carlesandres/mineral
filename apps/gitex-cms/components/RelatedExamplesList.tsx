import { Example } from '@/types/Example';
import React from 'react';
import ExampleSimpleList from './ExampleSimpleList';

interface RelatedExamplesListProps {
  relatedExamples: Example[];
}

const RelatedExamplesList = (props: RelatedExamplesListProps) => {
  const { relatedExamples } = props;

  return (
    <div className="pt-8">
      <ExampleSimpleList results={relatedExamples} />
    </div>
  );
};

export default RelatedExamplesList;
