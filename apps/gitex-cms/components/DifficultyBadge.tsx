import React from 'react';
import { Badge } from 'components/ui/badge';
import { cn } from '@/lib/utils';

interface DifficultyBadgeProps {
  difficulty: number;
  className?: string;
  variant?: 'solid' | 'outline';
}

export const difficultyClassMap = [
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
];

const outlineClassMap = ['text-green-800', 'text-yellow-800', 'text-red-800'];
export const difficultyMap = ['Beginner', 'Intermediate', 'Advanced'];

const DifficultyBadge = ({
  difficulty,
  className = '',
  variant = 'solid',
}: DifficultyBadgeProps) => {
  const difficultyClass = difficultyClassMap[difficulty - 1];
  const outlineClass = cn(
    'bg-transparent -ml-1.5',
    outlineClassMap[difficulty - 1],
  );

  return (
    <Badge
      tabIndex={-1}
      className={cn(
        `uppercase tracking-wider shrink-0 pointer-events-none`,
        { [difficultyClass]: variant === 'solid' },
        { [outlineClass]: variant === 'outline' },
        className,
      )}
    >
      {difficultyMap[difficulty - 1]}
    </Badge>
  );
};

export default DifficultyBadge;
