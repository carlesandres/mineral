import { useCallback, useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';

export interface ListItemDateProps {
  date: number | null;
}

const ListItemDate = (props: ListItemDateProps) => {
  const { date } = props;
  const [formattedDate, setFormattedDate] = useState('');

  const reformat = useCallback(() => {
    if (!date) {
      return;
    }
    const dateUpdated = formatDistance(new Date(date), new Date(), {
      addSuffix: true,
    });
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
      Edited {formattedDate}
    </div>
  );
};

export default ListItemDate;
