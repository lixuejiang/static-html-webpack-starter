const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { name, version } = require('./package.json');


const generateHTMLPlugins = () => glob.sync('./src/**/*.ejs').map(
  dir => new HTMLWebpackPlugin({
    filename: path.basename(dir.replace('.ejs', '.html')), // Output
    template: dir, // Input
    publicPath: process.env.NODE_ENV === 'production' ? `//s.newscdn.cn/${name}/${version}/` : '/',
  }),
);

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: ['./src/js/app.js', './src/style/main.less'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? `//s.newscdn.cn/${name}/${version}/` : '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500,
              name: 'static/[name].[ext]',
              publicPath: process.env.NODE_ENV === 'production' ? `//s.newscdn.cn/${name}/${version}/` : '/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/static/',
        to: './static/',
      },
    ]),
    ...generateHTMLPlugins(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
