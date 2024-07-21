import { ReactNode } from 'react';

export interface LabelProps {
  children: ReactNode;
  className?: string;
}

const Label = (props: LabelProps) => {
  const { className = '' } = props;

  return (
    <h2
      className={`text-sm font-semibold uppercase text-gray-400 dark:text-gray-400  ${className}`}
    >
      {props.children}
    </h2>
  );
};

export default Label;
