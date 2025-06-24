import React from 'react';
import { formatDate } from 'utils/formatDate';

export interface EditorStatisticsProps {
  text: string;
  createdAt: number;
}

const EditorStatistics = (props: EditorStatisticsProps) => {
  const { text, createdAt } = props;

  const usefulText = text.trim();

  const numWords = usefulText ? usefulText.split(/\s+/).length : 0;
  const creationDate = formatDate(createdAt);

  return (
    <div className="flex text-xs">
      <div className="w-[12ch] text-blue-700 dark:text-blue-400">
        {text.length} chars
      </div>
      <div className="w-[12ch] text-pink-700 dark:text-pink-400">
        {numWords} words
      </div>
      <div className="hidden text-gray-500 sm:block">
        Created: {creationDate}
      </div>
    </div>
  );
};

export default EditorStatistics;
