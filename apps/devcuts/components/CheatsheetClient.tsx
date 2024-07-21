'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Cheat } from 'types/Cheat';
import ListCheatsheet from './ListCheatsheet';
import ArticleCheatsheet from './ArticleCheatsheet';

interface CheatsheetClientProps {
  cheats: Cheat[];
}

const CheatsheetClient = (props: CheatsheetClientProps) => {
  const view = useSearchParams().get('view') || 'list';

  if (view === 'list') {
    return <ListCheatsheet cheats={props.cheats} />;
  }

  return <ArticleCheatsheet cheats={props.cheats} />;
};

export default CheatsheetClient;
