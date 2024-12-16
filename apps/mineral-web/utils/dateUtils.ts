import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const dateFromNow = (timestamp = null) =>
  formatDistanceToNow(new Date(timestamp), { addSuffix: true });
