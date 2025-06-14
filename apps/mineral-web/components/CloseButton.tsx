import { X } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { Button } from 'components/ui/button';
import { cn } from '@/lib/utils';

interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

const CloseButton = (props: CloseButtonProps) => {
  const { className = '', children, ...otherProps } = props;

  return (
    <Button
      {...otherProps}
      className={cn(
        `no-print absolute top-1 right-1 h-6 w-6 cursor-pointer`,
        className,
      )}
      size="icon"
      variant="ghost"
    >
      {children || <X size={16} />}
    </Button>
  );
};

export default CloseButton;
