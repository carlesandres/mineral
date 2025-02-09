import { X } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { Button } from 'components/ui/button';
import { twMerge } from 'tailwind-merge';

interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CloseButton = (props: CloseButtonProps) => {
  const { className = '', ...otherProps } = props;

  return (
    <Button
      {...otherProps}
      className={twMerge(`no-print absolute right-1 top-1 h-6 w-6`, className)}
      size="icon"
      variant="ghost"
    >
      <X size={16} />
    </Button>
  );
};

export default CloseButton;
