const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const config = {
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(["dist"]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
      exclude: ["vendor.js"],
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
    // new CompressionPlugin({
    //     asset: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: /\.tsx$|\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
    //     threshold: 10240,
    //     minRatio: 0.8
    // }),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false, // remove comments
        },
        compress: {
          unused: true,
          dead_code: true, // big one--strip code that will never execute
          warnings: false, // good for prod apps so users can't peek behind curtain
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true, // strips console statements
          sequences: true,
          booleans: true,
        },
      },
    }), // 52ff05a530ba06b74e85.bundle.js  267 KiB
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  optimization: {
    minimizer: [
      // new TerserPlugin({
      //     include: /\/includes/,
      //     cache: true,
      //     parallel: true,
      // }),
      new UglifyJsPlugin({
        include: /\/includes/,
      }),
    ],
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: -10,
        },
      },
    },
    runtimeChunk: false,
  },
  mode: "production", //production,development
  devtool: "cheap-module-source-map", //cheap-module-source-map
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
  },
  node: {
    net: "empty",
    dns: "empty",
  },
  devServer: {
    compress: true,
    before(app) {
      app.get("*.js", function (req, res, next) {
        req.url = req.url + ".gz";
        res.set("Content-Encoding", "gzip");
        res.set("Content-Type", "text/javascript");
        next();
      });

      app.get("*.css", function (req, res, next) {
        req.url = req.url + ".gz";
        res.set("Content-Encoding", "gzip");
        res.set("Content-Type", "text/css");
        next();
      });
      app.use(
        compression({
          level: 2, // set compression level from 1 to 9 (6 by default)
          filter: shouldCompress, // set predicate to determine whether to compress
        })
      );
    },
  },
};
module.exports = merge(common, config);
