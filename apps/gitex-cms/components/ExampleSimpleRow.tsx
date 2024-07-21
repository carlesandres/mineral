import React from 'react';
import Link from 'next/link';
import { Example2 } from '@/types/Example2';

export interface ExampleSimpleRowProps extends Example2 {}

const difficultyColors = [
  'border-green-100',
  'border-yellow-100',
  'border-red-100',
];

const ExampleSimpleRow = (props: ExampleSimpleRowProps) => {
  const { example, difficulty, draft, id } = props;

  const textColor = draft ? 'text-gray-400' : 'text-gray-900';
  const difficultyColor = difficultyColors[difficulty - 1];

  return (
    <Link
      href={`/examples/${id}`}
      className={`flex w-full items-center rounded bg-white
        transition hover:bg-gray-100 shadow
         ${textColor} border-l-8 ${difficultyColor}`}
    >
      <div className="flex-1 p-2 text-left font-bold">{example}</div>
    </Link>
  );
};

export default ExampleSimpleRow;
