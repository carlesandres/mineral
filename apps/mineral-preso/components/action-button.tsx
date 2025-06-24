import { ComponentProps } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends ComponentProps<typeof Button> {}

export const ActionButton = (props: ActionButtonProps) => {
  const { children, className, ...rest } = props;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        `size-6 cursor-pointer rounded-full text-sm font-semibold`,
        `bg-gray-50 text-gray-800 transition hover:bg-gray-800 hover:text-gray-200 dark:bg-gray-300 dark:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-gray-800`,
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};
