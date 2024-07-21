import { cn } from '@/lib/utils';
import React from 'react';
interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const H1 = (props: TypographyProps) => {
  const { className, children, ...rest } = props;

  return (
    <h1
      className={cn(
        `scroll-m20 text-4xl font-extrabold tracking-tight lg:text-5xl`,
        className,
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};

export const H2 = (props: TypographyProps) => {
  const { className, children, ...rest } = props;

  return (
    <h2
      className={cn(
        `scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0`,
        className,
      )}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const H3 = (props: TypographyProps) => {
  const { className, children, ...rest } = props;

  return (
    <h3
      className={cn(
        `scroll-m-20 text-2xl font-semibold tracking-tight pb-8`,
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  );
};
