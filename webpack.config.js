const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  mode: 'production',
  target: 'node'
};
