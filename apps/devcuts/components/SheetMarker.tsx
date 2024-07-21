import React from 'react';
import { cn } from 'utils';
import { Lock } from 'lucide-react';

interface SheetMarkerProps {
  color?: string;
  size?: 'default' | 'large';
  isPrivate: boolean;
}

const SheetMarker = (props: SheetMarkerProps) => {
  const { color, size = 'default', isPrivate } = props;

  const privateIcon = isPrivate ? (
    <Lock size={size === 'default' ? 12 : 16} className="text-white" />
  ) : null;

  return (
    <div
      className={cn(
        { 'w-6 h-6': size === 'default', 'w-8 h-8': size === 'large' },
        'flex items-center justify-center aspect-square rounded-full print:!bg-transparent print:!text-black',
      )}
      style={{ background: color }}
    >
      {privateIcon}
    </div>
  );
};

export default SheetMarker;
