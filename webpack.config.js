const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
