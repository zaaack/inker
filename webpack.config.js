const webpack = require('webpack')
const Clean = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const OfflinePlugin = require('offline-plugin');
// const cssModules = require('./tools/webpack-blocks/css-loader')
const path = require('path')

const __DEV__ = process.env.NODE_ENV === 'development'

const Dist = `${__dirname}/static/dist/`
const Name = 'inker'

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: "./src/index.js",
  },
  output: {
    filename: "[name]_[hash:5].js",
    path: Dist,
    publicPath: `/${Name}/static/dist/`,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: ['node_modules', 'src'],
  },

   devServer: {
     contentBase: './',
     hot: true,
     proxy: {
     }
   },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: {
          loader: "awesome-typescript-loader",
        },
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /test\/fixtures\/.*\.svg$/,
        use: [ 'raw-loader' ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        exclude: /test\/fixtures\//,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ],
      },
    ]
  },

  plugins: [
    !__DEV__ && new Clean(["static/dist/!(vendor*.js)"]),
    __DEV__ && new webpack.NamedModulesPlugin(),
    __DEV__ && new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(__DEV__ ? true : false),
    }),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require(`${Dist}/vendor-manifest.json`),
    // }),
    new HtmlWebpackPlugin({
      __DEV__: __DEV__,
      template: './src/index.ejs',
      filename: __DEV__ ? '../../index.html' : '../index.html',
      inject: false,
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),

    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name]_[hash:5].js',
      entry: {
        vendor: [
          'react', 'emotion', 'hydux', 'hydux-mutator', 'hydux-react',
          'lru-cache', 'parse5', 'react-clipboard.js', 'react-contexify',
          'react-dropzone', 'tinycolor2', 'tslib', './src/vendor.ts'
        ]
      }
    }),
    !__DEV__ && new OfflinePlugin({
      appShell: `/${Name}/`,
      responseStrategy: 'cache-first',
      caches: {
        main: ['**/*.js', '**/*.{svg,png,jpg}', '*.chunk.js', '*.worker.js', ':externals:'],
				additional: [],
				optional: [':rest:']
      },
      externals: [
        `/${Name}/`
      ],
      exclude: ['**/.*', '**/*.map', '**/*.gz'],
      ServiceWorker: {
        events: true,
        publicPath: `/${Name}/sw.js`
      }
    }),
  ].filter(Boolean),
};
