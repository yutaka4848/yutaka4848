
const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

console.log(__dirname);

module.exports = {
  mode: "production",
  cache: false,
  entry: {
    chart: "./src/chart.js",
    emoji: "./src/emoji.jsx",
    crypto: "./src/crypto.jsx",
    micInput: "./src/mic-input.jsx"
  },
  resolve: {
    extensions: [".js", ".jsx", "ts."]
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
  resolve: {
    fallback: {
      crypto: false
    }
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