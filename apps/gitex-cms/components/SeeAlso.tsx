import React from 'react';
import ExampleSimpleList from './ExampleSimpleList';
import FieldLabel from './FieldLabel';
import { Example } from '@/types/Example';
import { getRelatedExamples } from '@/utils/getRelatedExamples';

interface IProps {
  example: Example;
}

const SeeAlso = async (props: IProps) => {
  const { example } = props;
  const relatedExamples = await getRelatedExamples(example);

  if (!relatedExamples || relatedExamples.length === 0) {
    return null;
  }

  const publishedExamples = relatedExamples.filter((example) => !example.draft);

  return (
    <div className="mt-16">
      <FieldLabel>Related examples:</FieldLabel>
      <ExampleSimpleList results={publishedExamples} />
    </div>
  );
};

export default SeeAlso;
