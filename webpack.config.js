const webpack = require('webpack')
const Clean = require('clean-webpack-plugin')
// const cssModules = require('./tools/webpack-blocks/css-loader')
const path = require('path')

const IS_DEV = process.env.NODE_ENV === 'development'

const DIST = `${__dirname}/static/dist/`

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: DIST,
    publicPath: '/svg-measure/static/dist/',
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
    !IS_DEV && new Clean(["dist"], {exclude: ['vendor.js', 'vendor-manifest.json']}),
    IS_DEV && new webpack.NamedModulesPlugin(),
    IS_DEV && new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(IS_DEV ? true : false),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`${DIST}/vendor-manifest.json`),
    }),
  ].filter(Boolean)
};
