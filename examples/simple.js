const browsher = require('browsher').default;

browsher({
  browserName: 'chrome',
  url: 'http://localhost:8000/simple.html'
}).then(
  res => console.log('result:', res),
  err => console.error('error:', err)
);