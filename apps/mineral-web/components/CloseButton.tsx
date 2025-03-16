import { X } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { Button } from 'components/ui/button';
import { cn } from '@/lib/utils';

interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CloseButton = (props: CloseButtonProps) => {
  const { className = '', ...otherProps } = props;

  return (
    <Button
      {...otherProps}
      className={cn(
        `no-print absolute right-1 top-1 h-6 w-6 text-secondary-foreground`,
        className,
      )}
      size="icon"
      variant="ghost"
    >
      <X size={16} />
    </Button>
  );
};

export default CloseButton;
