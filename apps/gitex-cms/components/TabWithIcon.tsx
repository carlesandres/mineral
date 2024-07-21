import React from 'react';
import { cn } from '@/lib/utils';

interface TabWithIconProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  className?: string;
}

const TabWithIcon = (props: TabWithIconProps) => {
  const { icon, label, count, className } = props;

  const countIsNumber = typeof count === 'number';

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {icon}
      <span className="hidden sm:inline-block">{label}</span>
      {countIsNumber && <span className="text-gray-400">({count})</span>}
    </div>
  );
};

export default TabWithIcon;
