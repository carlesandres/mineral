import React from 'react';
import { formatDate } from 'utils/formatDate';

export interface EditorStatisticsProps {
  text: string;
  show: boolean;
  createdAt: number;
}

const EditorStatistics = (props: EditorStatisticsProps) => {
  const { text, show, createdAt } = props;

  if (!show) {
    return null;
  }

  const usefulText = text.trim();

  const numWords = usefulText ? usefulText.split(/\s+/).length : 0;
  const creationDate = formatDate(createdAt);

  return (
    <div className="flex">
      <div className="pill w-24 text-blue-700 dark:text-blue-400">
        {text.length} chars
      </div>
      <div className="pill w-24 text-pink-700 dark:text-pink-400">
        {numWords} words
      </div>
      <div className="pill text-gray-500">Created: {creationDate}</div>
    </div>
  );
};

export default EditorStatistics;
