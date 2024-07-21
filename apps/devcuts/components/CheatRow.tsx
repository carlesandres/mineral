'use client';
import React, { useCallback, useState } from 'react';
import { Cheat } from 'types/Cheat';
import CheatEditRow from './CheatEditRow';
import { cn } from 'utils';
import MarkdowContent from './MarkdownContent';
import CheatMenu from './CheatMenu';
import { Grip } from 'lucide-react';

interface CheatRowProps {
  cheat: Cheat;
  numCols: number;
  canEdit: boolean;
  id: string;
}

const CheatRow = (props: CheatRowProps) => {
  const { cheat, numCols, canEdit, id } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const doneStyle = cheat.done ? 'line-through text-gray-400' : '';

  const description =
    numCols == 2 ? (
      <MarkdowContent
        className={cn('hidden sm:block flex-1 sm:line-clamp-1', doneStyle)}
        text={cheat.description}
      />
    ) : null;

  const handleEdit = useCallback(() => setIsEditMode(true), []);
  const handleDone = useCallback(() => setIsEditMode(false), []);

  if (isEditMode) {
    return <CheatEditRow cheat={cheat} numCols={numCols} onDone={handleDone} />;
  }

  return (
    <div
      className="cheat-row w-full border-b flex gap-2 py-2 items-center justify-between text-sm sm:text-base hover:bg-gray-100 cursor-pointer"
      onDoubleClick={handleEdit}
      id={id}
    >
      <div className="handle w-4 h-4 flex items-center justify-center">
        <Grip />
      </div>
      <MarkdowContent
        className={cn('flex-1 line-clamp-1 max-w-none', doneStyle)}
        text={cheat.hook}
      />
      {description}
      {canEdit && <CheatMenu cheat={cheat} handleEdit={handleEdit} />}
    </div>
  );
};

export default CheatRow;
