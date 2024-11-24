import { useCallback, useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';

export interface ListItemDateProps {
  date: number;
}

const ListItemDate = (props: ListItemDateProps) => {
  const { date } = props;
  const [formattedDate, setFormattedDate] = useState('');

  const reformat = useCallback(() => {
    const dateUpdated = formatDistance(new Date(date), new Date(), {
      addSuffix: true,
    });
    setFormattedDate(dateUpdated);
  }, [date]);

  useEffect(() => {
    reformat();
    const interval = window.setInterval(reformat, 60000);

    return () => {
      window.clearInterval(interval);
    };
  }, [reformat]);

  return (
    <div
      className={`hidden shrink-0 text-xs text-gray-400 transition
            duration-200 group-hover:opacity-0 dark:text-gray-400 sm:block`}
    >
      {formattedDate}
    </div>
  );
};

export default ListItemDate;
