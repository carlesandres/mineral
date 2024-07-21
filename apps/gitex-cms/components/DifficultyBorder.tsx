import React from 'react';

export interface DifficultyBorderProps {
  difficulty: number;
  isSide?: boolean;
  className?: string;
}

const difficultyStyles = [
  'bg-green-200 text-green-900',
  'bg-yellow-200 text-yellow-900',
  'bg-red-200 text-red-900',
];

const DifficultyBorder = (props: DifficultyBorderProps) => {
  const { difficulty, className = '' } = props;

  const shapeClass = props.isSide ? 'w-2' : 'h-2';

  return (
    <div
      className={`${
        difficultyStyles[difficulty - 1] || ''
      } ${shapeClass} ${className}
        shrink-0`}
    />
  );
};

export default DifficultyBorder;
