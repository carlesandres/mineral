import { useCallback, useEffect, useState } from 'react';
import { format, isToday } from 'date-fns';

export interface NoteRowDateProps {
  date: number | null;
}

const NoteRowDate = (props: NoteRowDateProps) => {
  const { date } = props;
  const [formattedDate, setFormattedDate] = useState('');

  const reformat = useCallback(() => {
    if (!date) {
      return;
    }
    // Format like gmail inbox date
    const dateObj = new Date(date);

    const dateUpdated = isToday(dateObj)
      ? format(dateObj, 'h:mm a')
      : format(dateObj, 'MMM d');

    setFormattedDate(dateUpdated);
  }, [date]);

  useEffect(() => {
    reformat();
    // TO-DO: Check if we can do this in a more react-y way (e.g. changing `key`
    // prop)
    const interval = window.setInterval(reformat, 60000);

    return () => {
      window.clearInterval(interval);
    };
  }, [reformat]);

  if (!date) {
    return null;
  }

  return (
    <div
      className={`hidden shrink-0 text-xs text-gray-400 transition duration-200 group-hover:opacity-0 dark:text-gray-400 sm:block`}
    >
      {formattedDate}
    </div>
  );
};

export default NoteRowDate;
