import { useState, HTMLAttributes } from 'react';
import Link from 'next/link';
import Tooltip from 'components/Tooltip';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'small' | 'xs';
  href?: string;
  tooltip?: string;
}

const Button = (props: ButtonProps) => {
  const {
    tooltip,
    children,
    href,
    onClick,
    className = '',
    variant = 'normal',
    ...restProps
  } = props;

  const [showTooltip, setShowTooltip] = useState(false);

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

  const handlePointerEnter = () => {
    if (tooltip) {
      setShowTooltip(true);
    }
  };

  const tooltipEl = (
    <Tooltip
      show={showTooltip}
      text={tooltip}
      disabled={false}
      className="top-full -right-full  z-10"
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className={commonClasses}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={() => setShowTooltip(false)}
      >
        {children}
        {tooltipEl}
      </Link>
    );
  }

  return (
    <button
      className={commonClasses}
      {...restProps}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setShowTooltip(false)}
    >
      {children}
      {tooltipEl}
    </button>
  );
};

export default Button;
