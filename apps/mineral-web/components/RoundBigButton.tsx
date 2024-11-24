import { HTMLAttributes, forwardRef, Ref } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const RoundBigButton = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const { className, children, ...restProps } = props;
  return (
    <button
      ref={ref}
      className={`
          flex h-8 w-8 shrink-0 items-center justify-center
          rounded-full border border-gray-500
          text-sm dark:text-white
          transition hover:bg-gray-200 active:bg-gray-300
          dark:hover:bg-gray-700 dark:active:bg-gray-600
          dark:text-gray-200:hover:bg-gray-300 ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default forwardRef(RoundBigButton);
