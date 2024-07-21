import { forwardRef, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputboxProps extends React.HTMLProps<HTMLInputElement> {}

const Inputbox = forwardRef(
  (props: InputboxProps, ref: RefObject<HTMLInputElement>) => {
    const { className = '', ...restProps } = props;

    return (
      <input
        {...restProps}
        ref={ref}
        className={twMerge(`
          flex-1
          !border-transparent bg-transparent font-mono
          text-xl font-bold placeholder-gray-400
          transition hover:border-gray-500
          focus:bg-gray-200
          dark:focus:bg-gray-700
          focus:outline-none
          focus:ring-0 dark:text-gray-300 dark:placeholder-gray-600
          print:border-none print:text-black`, className)}
      />
    );
  }
);

Inputbox.displayName = 'Inputbox';

export default Inputbox;
