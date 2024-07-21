import React from 'react';
import { Card, CardContent } from 'components/ui/card';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/lib/utils';

interface StatCardProps {
  amount: string;
  subtext: string;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const variantColorMap = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
};

const StatCard = (props: StatCardProps) => {
  const { amount, subtext, variant = 'info', className } = props;

  const mainColorClass = variantColorMap[variant];

  return (
    <Card className={cn('block w-full sm:w-48', className)}>
      <CardContent className="flex flex-row gap-2 sm:gap-0 sm:flex-col items-center py-2 sm:p-4">
        <div
          className={twMerge('sm:mb-4 font-bold sm:text-3xl', mainColorClass)}
        >
          {amount}
        </div>
        <div className="text-gray-500">{subtext}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
