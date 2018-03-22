const path = require('path');

const config = {
  entry: {
    app: path.join(__dirname, './src/js/index.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname)
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, './node_modules')
        ]
      }
    ]
  }
};

module.exports = config;