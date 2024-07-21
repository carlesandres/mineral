import React from 'react';

export interface ProgressBarProps {
  progress: number;
  widthPx?: number;
  className?: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  const { progress, widthPx = 200, className = '' } = props;
  const progressPerc = Math.round(progress * 100);

  return (
    <div
      className={`flex justify-end space-x-2 
      text-sm font-normal ${className}`}
    >
      <div
        className="progress relative flex h-8 items-center justify-center overflow-hidden rounded bg-gray-200"
        style={{ width: `${widthPx}px` }}
      >
        <div
          className="absolute bottom-0 left-0 top-0 bg-green-200"
          style={{ width: `${progress * widthPx}%` }}
        ></div>
        <span className="z-10 text-green-900">{progressPerc}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
