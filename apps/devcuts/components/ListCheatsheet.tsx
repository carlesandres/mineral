import React from 'react';
import { cn } from 'utils';
import MarkdowContent from './MarkdownContent';
import { Cheat } from 'types/Cheat';

interface ListCheatsheetProps {
  cheats: Cheat[];
}

const ListCheatsheet = (props: ListCheatsheetProps) => {
  const { cheats } = props;

  const listCheats = cheats.map((cheat) => {
    return (
      <div key={cheat.id} className="mb-4">
        <h3 className="font-bold">
          <MarkdowContent
            className={cn('text-2xl hidden sm:block flex-1 sm:line-clamp-1')}
            text={cheat.hook}
          />
        </h3>
        <MarkdowContent
          className={cn('hidden sm:block flex-1 sm:line-clamp-1')}
          text={cheat.description}
        />
      </div>
    );
  });

  return <div>{listCheats}</div>;
};

export default ListCheatsheet;
