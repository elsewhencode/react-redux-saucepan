const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */
const { ASSETS_PATH } = require('./../config');

const srcPath = path.resolve(__dirname, '../src/client');

module.exports = {
  context: srcPath,
  mode: 'production',
  target: 'web',
  entry: {
    app: [path.join(process.cwd(), 'src/client/index.jsx')],
    vendor: ['react', 'react-dom', 'redux', 'react-router-dom'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: ASSETS_PATH,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['browser', 'module', 'main'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
    runtimeChunk: false,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          // https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options-structure
          mangle: true,
          ecma: 8,
          warnings: false, // Suppress uglification warnings
          ie8: false,
          safari10: false,
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
          exclude: [/\.min\.js$/gi], // skip pre-minified libs
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // This plugin should be used only on production
        // builds without style-loader in the loaders chain
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // Font Definitions
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [{ loader: 'eslint-loader' }, { loader: 'stylelint-custom-processor-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: true, // default is true. But jus a reminder that .babelrc is in use
        },
        exclude: /node_modules/,
      },
    ],
  },
  // devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: true,
      __DEVELOP__: false,
    }),
    // Any dev code which is 'develop' will be considered as dead code and will be eliminated
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'app.[chunkhash].css',
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ManifestPlugin(),
  ],
};
