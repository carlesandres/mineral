import React from 'react';
import { BatteryLow, BatteryFull, BatteryMedium } from 'lucide-react';

interface IProps {
  progress: number;
  className?: string;
}

const ProgressIcon = (props: IProps) => {
  const { progress, className = '' } = props;

  const commonStyles = `h-6 w-auto ${className}`;

  if (progress === 0) {
    return <BatteryLow className={`${commonStyles} text-red-300`} />;
  }

  if (progress < 1) {
    return <BatteryMedium className={`${commonStyles} text-yellow-500`} />;
  }

  return <BatteryFull className={`${commonStyles} text-green-500`} />;
};

export default ProgressIcon;
