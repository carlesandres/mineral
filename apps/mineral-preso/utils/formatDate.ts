export const formatDate = (date: number, displayTime = false) => {
  if (!date) {
    return '';
  }
  const d = new Date(date);
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
  });
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    timeStyle: 'short',
  });

  const dateStr = dateFormatter.format(d);

  if (displayTime) {
    const timeStr = timeFormatter.format(d);

    return `${timeStr} ${dateStr}`;
  }

  return dateStr;
};
