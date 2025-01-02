const noop = () => {};  
const noLog = {
  log: noop,
  time: noop,
  timeEnd: noop,
  error: noop,
  warn: noop,
};

const isProd = process.env.NODE_ENV === 'production';
const actualLog = isProd ? noLog : console;  

export default actualLog;
