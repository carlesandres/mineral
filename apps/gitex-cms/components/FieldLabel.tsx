import React from 'react';

interface FieldLabelProps {
  children: React.ReactNode;
  className?: string;
}

const FieldLabel = (props: FieldLabelProps) => {
  const { children, className = '' } = props;

  return (
    <div
      className={`pb-2 text-sm font-bold uppercase
        tracking-wider text-gray-500 ${className}`}
    >
      {children}
    </div>
  );
};

export default FieldLabel;
