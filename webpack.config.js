const path = require("path");

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
    filename: "script.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
};
