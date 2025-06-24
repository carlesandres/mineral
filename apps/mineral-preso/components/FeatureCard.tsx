import { HTMLAttributes } from 'react';

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

const FeatureCard = (props: FeatureCardProps) => {
  const { title, children, className, ...restProps } = props;

  return (
    <div
      className={`rounded-lg bg-gray-100 p-6 shadow-lg sm:w-1/2 md:w-1/3 dark:bg-gray-800 ${className}`}
      {...restProps}
    >
      <h2 className="mb-4 text-xl font-semibold text-yellow-500">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default FeatureCard;
