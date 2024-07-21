import { forwardRef, Ref, HTMLAttributes, ReactNode } from 'react';

export interface Button2Props extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  text: string;
  disabled?: boolean;
}

const Button2 = forwardRef(
  (props: Button2Props, ref: Ref<HTMLButtonElement>) => {
    const { icon, text, disabled, className = '', ...otherProps } = props;

    const renderedText = <div className="label">{text}</div> || null;

    const completeClassName = `
    w-full flex flex-1
    p-1.5 rounded
    text-gray-800 
    dark:text-gray-200
    hover:bg-[var(--solid-hover-bg-color)]
    disabled:bg-transparent
    transition
    items-center
    cursor-pointer
    space-x-3 ${className} disabled:text-gray-400 dark:disabled:text-gray-600`;

    return (
      <button
        ref={ref}
        data-test={icon}
        className={completeClassName}
        disabled={disabled}
        {...otherProps}
      >
        {icon}
        {renderedText}
      </button>
    );
  }
);

export default Button2;
