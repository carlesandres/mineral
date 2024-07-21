const noop = () => {}; // eslint-disable-line no-empty-function
const noLog = {
  log: noop,
  time: noop,
  timeEnd: noop,
  error: noop,
  warn: noop,
};

const isProd = process.env.NODE_ENV === 'production';
const actualLog = isProd ? noLog : console; // eslint-disable-line no-console

export default actualLog;
