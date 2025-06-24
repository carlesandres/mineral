import React from 'react';

export interface FeatureSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const FeatureSectionTitle = (props: FeatureSectionTitleProps) => {
  const { className = '', children, ...restProps } = props;

  return (
    <h2
      className={`mb-4 mt-8 text-lg font-semibold uppercase text-gray-400 sm:mb-8 sm:mt-16 ${className}`}
      {...restProps}
    >
      {children}
    </h2>
  );
};

export default FeatureSectionTitle;
