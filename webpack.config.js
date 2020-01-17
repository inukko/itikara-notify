
module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: `${__dirname}/dist`
  },
  resolve: {
    extensions: [".ts"]
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: "awesome-typescript-loader" }]
  },
  plugins: []
};
