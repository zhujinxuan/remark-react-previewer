let HtmlwebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./demo",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      "remark-react-previewer": path.join(__dirname, "src/index.js")
    }
  },
  devtool: "sourcemap",
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      { test: /\.md$/, use: "raw-loader" }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: "React Counter Container"
    })
  ]
};
