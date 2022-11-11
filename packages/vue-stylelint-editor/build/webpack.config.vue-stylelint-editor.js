"use strict";

const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const webpack = require("webpack")
const path = require("path");

// eslint-disable-next-line no-console, no-process-env  -- log
console.log(`NODE_ENV=${process.env.NODE_ENV}`);

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  // devtool: "eval-source-map",
  /* eslint-disable no-process-env -- node */
  mode: process.env.NODE_ENV || "production",
  /* eslint-enable no-process-env -- node */
  entry: {
    "vue-stylelint-editor": require.resolve("../lib/index.vue"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    library: {
      root: "VueStylelintEditor",
      amd: "vue-stylelint-editor",
      commonjs: "vue-stylelint-editor",
    },
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.vue$/u,
        loader: "vue-loader",
      },
      {
        test: /\.css$/u,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/u,
        use: [
          {
            loader: "url-loader",
            options: { limit: 100000 },
          },
        ],
      },
    ],
  },
  // optimization: {
  //     minimize: false,
  // },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
