const browsher = require('browsher').default;

const LEVEL_MAP = {
  debug: '🔎',
  log: '💬',
  warn: '⚠️',
  error: '🚫',
};

browsher({
  browserName: 'chrome',
  url: 'http://localhost:8000/console.html'
}).then(instance => {
  instance.on('log', ({ level, args }) => (
    console[level](`[browser - ${LEVEL_MAP[level]}]`, ...args)
  ));
}).catch(err => (
  console.error(err)
));
