import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
  target: 'node',
  entry: ['./src/index.ts'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js', // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
};

export default config;
