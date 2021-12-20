console.log("development");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const devServer = {
  port: 4446,
  open: true,
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: true,
  stats: "minimal",
  inline: true,
  compress: true,
  contentBase: "/",
  clientLogLevel: "error",
  public: 'localhost:4446',
};
const config = {
  mode: "development", //production,development
  devtool: "source-map", //cheap-module-source-map
  devServer,
};
module.exports = merge(common, config);
