import { HTMLAttributes } from 'react';
import Link from 'next/link';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'small' | 'xs';
  href?: string;
  tooltip?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    href,
    onClick,
    className = '',
    variant = 'normal',
    ...restProps
  } = props;

  const variantClassMap = {
    small: 'text-sm px-2 py-1',
    normal: 'px-4 py-2',
    xs: 'p-2 !border-none text-base',
  };
  const additionalClass = variantClassMap[variant];

  const commonClasses = `cursor-pointer rounded
      relative
      flex gap-2 items-center justify-center
      border border-gray-500 
      transition
      text-[var(--text-color)]
      focus-visible:border-blue-500
      bg-[var(--solid-bg-color)]
      hover:bg-[var(--solid-hover-bg-color)]
      ${additionalClass} ${className}
      `;

  if (href) {
    return (
      <Link href={href} className={commonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={commonClasses} {...restProps} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
