import React from 'react';
import Link from 'next/link';

export interface NavigationControlsProps {
  navIds: string[];
  currentCheatId: string;
  path: string;
  className?: string;
}

const NavigationControls = (props: NavigationControlsProps) => {
  const { navIds, currentCheatId, path, className = '' } = props;

  const currentIndex = navIds.indexOf(currentCheatId);
  const previousCheatId = navIds[currentIndex - 1];
  const nextCheatId = navIds[currentIndex + 1];

  return (
    <div
      className={`flex items-center justify-between rounded bg-gray-200 
          px-4 py-2 ${className}`}
    >
      <span>
        {previousCheatId && (
          <Link
            href={`/${path}/${previousCheatId}`}
            className="text-blue-500 hover:text-blue-600"
          >
            Previous
          </Link>
        )}
      </span>
      <span className="text-sm text-gray-500">
        {currentIndex + 1} of {navIds.length}
      </span>
      <span>
        {nextCheatId && (
          <Link
            href={`/${path}/${nextCheatId}`}
            className="text-blue-500 hover:text-blue-600"
          >
            Next
          </Link>
        )}
      </span>
    </div>
  );
};

export default NavigationControls;
