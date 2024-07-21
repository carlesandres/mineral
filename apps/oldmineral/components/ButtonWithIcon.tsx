import { forwardRef, Ref, HTMLAttributes } from 'react';
import Icon from './Icon';

export interface ButtonWithIconProps extends HTMLAttributes<HTMLButtonElement> {
  icon: string;
  text: string;
  disabled?: boolean;
}

const ButtonWithIcon = forwardRef(
  (props: ButtonWithIconProps, ref: Ref<HTMLButtonElement>) => {
    const { icon, text, disabled, className = '', ...otherProps } = props;

    const displayedIcon = icon ? (
      <span className={`icon fill-current text-sm`}>
        <Icon icon={icon} />
      </span>
    ) : null;

    const renderedText = <div className="label">{text}</div> || null;

    const completeClassName = `
    w-full flex flex-1
    p-2 rounded
    text-gray-800 hover:bg-white
    dark:text-gray-200 dark:hover:bg-gray-800
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
        {displayedIcon}
        {renderedText}
      </button>
    );
  }
);

export default ButtonWithIcon;
