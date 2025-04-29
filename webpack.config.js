const path = require('path');

module.exports = {
  entry: () => {
    const entries = {};
    entries['bundle'] = './src/js/main.js';
    return entries;
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};