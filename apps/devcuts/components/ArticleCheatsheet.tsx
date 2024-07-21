import React from 'react';
import { Cheat } from 'types/Cheat';
import { cn } from 'utils';
import MarkdowContent from './MarkdownContent';

interface ArticleCheatsheetProps {
  cheats: Cheat[];
}

const ArticleCheatsheet = (props: ArticleCheatsheetProps) => {
  const { cheats } = props;

  const articleCheats = cheats.map((cheat) => {
    return (
      <div key={cheat.id} className="grid grid-cols-2 mb-4 odd:bg-gray-100">
        <MarkdowContent className={cn('font-bold')} text={cheat.hook} />
        <MarkdowContent className={cn('')} text={cheat.description} />
      </div>
    );
  });

  return <div>{articleCheats}</div>;
};

export default ArticleCheatsheet;
