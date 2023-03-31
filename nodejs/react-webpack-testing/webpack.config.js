const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log(__dirname);

module.exports = {
  mode: "production",
  cache: false,
  entry: {
    clock: "./src/render-clock.jsx",
    chart: "./src/chart.js",
    emoji: "./src/emoji.jsx"
  },
  output:{
    path: path.join(__dirname, "dist"),
    publicPath: "/dist",
    filename: "[name].js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "static")
    },
    compress: true,
    port: 60000,
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }]
    }, {
      test:  /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        } 
      }]
    }]
  }
}