import { X } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CloseButton = (props: CloseButtonProps) => {
  const { className = '', ...otherProps } = props;

  return (
    <button
      {...otherProps}
      className={twMerge(
        `no-print absolute right-0 top-0 cursor-pointer p-2 font-sans text-base font-bold leading-none text-gray-700 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-300 ${className}`,
      )}
    >
      <X />
    </button>
  );
};

export default CloseButton;
