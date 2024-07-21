import React from 'react';
import ExampleSimpleRow from './ExampleSimpleRow';
import { Example } from '@/types/Example';

interface IProps {
  results: Example[];
}

const ExampleSimpleList = (props: IProps) => {
  return (
    <ul className="mt-2 flex flex-col gap-4 font-mono">
      {props.results?.map((result) => (
        <li key={result.id}>
          <ExampleSimpleRow {...result} />
        </li>
      ))}
    </ul>
  );
};

export default ExampleSimpleList;
