import React from 'react';
import PieStat from './PieStat';

interface CompletionPieStatProps {
  total: number;
  completed: number;
  label: string;
}

const CompletionPieStat = (props: CompletionPieStatProps) => {
  const { label, completed, total } = props;

  const completionPerc = ((completed / total) * 100).toFixed(0);

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold uppercase">{label}</div>
      <div className="text-sm text-gray-600">
        Completed: {completed}/{total} ({completionPerc}%)
      </div>
      <PieStat total={total} completed={completed} size={200} />
    </div>
  );
};

export default CompletionPieStat;
