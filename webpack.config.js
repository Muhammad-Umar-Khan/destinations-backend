const nodeExternals = require("webpack-node-externals");
const path = require("path");

const typicalReact = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    },
  ],
};

const clientConfig = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
  },
  mode: "development",
  module: typicalReact,
};

const serverConfig = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "index-compiled.js",
  },
  externals: [nodeExternals()],
  target: "node",
  mode: "production",
  module: typicalReact,
};

module.exports = [clientConfig, serverConfig];
