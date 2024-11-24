import React from 'react';

export interface FeatureSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const FeatureSectionTitle = (props: FeatureSectionTitleProps) => {
  const { className = '', children, ...restProps } = props;

  return (
    <h2
      className={`mt-8 mb-4 text-2xl font-semibold uppercase text-gray-400 
        sm:mt-16 sm:mb-8 ${className}`}
      {...restProps}
    >
      {children}
    </h2>
  );
};

export default FeatureSectionTitle;
