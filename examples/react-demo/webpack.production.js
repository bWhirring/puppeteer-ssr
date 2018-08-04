const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const {
  publicPath,
  filename,
  template,
  favicon
} = require("./package.json").config;

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./node_modules"),
        loader: "style-loader!css-loader!less-loader?javascriptEnabled=true"
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, "./node_modules"),
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      filename,
      template,
      favicon
    })
  ]
};
