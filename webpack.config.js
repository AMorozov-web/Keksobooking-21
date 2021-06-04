const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/form.js",
    "./js/move.js",
    "./js/message.js",
    "./js/filter.js",
    "./js/upload.js",
    "./js/main.js",
  ],
  output: {
    filename: "js/script.js",
    path: path.resolve(__dirname, 'public'),
    iife: true,
  },
  mode: 'production',
  devtool: false,
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000,
    historyApiFallback: true,
    watchContentBase: true,
    hot: true,
    open: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'img',
          to: 'img',
        },
        {
          from: 'css',
          to: 'css',
        },
        {
          from: 'fonts',
          to: 'fonts',
        },
      ],
    }),
  ],
};
