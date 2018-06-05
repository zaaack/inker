const webpack = require('webpack')
const Clean = require('clean-webpack-plugin')
// const cssModules = require('./tools/webpack-blocks/css-loader')
const path = require('path')

const IS_DEV = process.env.NODE_ENV === 'development'

const DIST = `${__dirname}/static/dist/`

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: "./src/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: DIST,
    publicPath: '/static/dist/',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

   devServer: {
     contentBase: './static',
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
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
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
    !IS_DEV && new Clean(["dist"]),
    IS_DEV && new webpack.NamedModulesPlugin(),
    IS_DEV && new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(IS_DEV ? true : false),
    }),
  ].filter(Boolean)
};
