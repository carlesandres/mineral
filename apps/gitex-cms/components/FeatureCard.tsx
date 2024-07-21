import { LucideIcon } from 'lucide-react';
import React from 'react';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
}

const FeatureCard = (props: FeatureCardProps) => {
  const { icon: Icon, title, className, children, ...rest } = props;
  return (
    <div
      className={` flex flex-col items-center space-y-4 ${className}`}
      {...rest}
    >
      <Icon size={32} />
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-center">{children}</p>
    </div>
  );
};

export default FeatureCard;
