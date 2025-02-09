import { HTMLAttributes } from 'react';

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

const FeatureCard = (props: FeatureCardProps) => {
  const { title, children, className, ...restProps } = props;

  return (
    <div
      className={`mx-auto flex w-72 flex-col rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800 ${className}`}
      {...restProps}
    >
      <h2 className="mb-4 text-xl font-semibold text-yellow-500">{title}</h2>
      {children}
    </div>
  );
};

export default FeatureCard;
