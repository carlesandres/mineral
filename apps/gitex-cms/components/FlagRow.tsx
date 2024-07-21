import React from 'react';
import type { CommandFlag } from '@/types/CommandFlag';
import DeleteFlagButton from './DeleteFlagButton';

interface FlagRowProps extends React.HTMLAttributes<HTMLDivElement> {
  flag: CommandFlag;
}

const FlagRow = (props: FlagRowProps) => {
  const { flag } = props;
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex-1 border p-2 rounded-lg bg-white text-sm">
        {flag.flag}
      </div>
      <DeleteFlagButton flag={flag} />
    </div>
  );
};

export default FlagRow;
