const webpack = require('webpack')
const Clean = require('clean-webpack-plugin')
// const cssModules = require('./tools/webpack-blocks/css-loader')
const path = require('path')

const IS_DEV = process.env.NODE_ENV === 'development'

const DIST = `${__dirname}/static/dist`

module.exports = {
  entry: {
    'bench': "./src/test/vdom/bench.ts",
  },
  output: {
      filename: "[name].js",
      path: __dirname + "/dist/test",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    noParse: [
        // Suppress warnings and errors logged by benchmark.js when bundled using webpack.
        // https://github.com/bestiejs/benchmark.js/issues/106
        /benchmark/
    ],
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          { test: /\.tsx?$/,
            use: {
              loader: "awesome-typescript-loader",
            },
          },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { enforce: "pre", test: /\.js$/, use: "source-map-loader" }
      ]
  },

  plugins: [
    new Clean(["dist/test"]),
  ]
};
