const TerserPlugin = require('terser-webpack-plugin');

const pkg = require('./package.json');

module.exports = {
  entry: ['./src/index.ts'],
  externals: {
    'lite-ts-rpc': 'lite-ts-rpc'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    path: __dirname,
    filename: `./${pkg.name}.min.js`,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
