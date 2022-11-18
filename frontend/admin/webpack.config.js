// webpack.config.js

const Dotenv = require("dotenv-webpack");

export const plugins = [
  new Dotenv({
    path: "./.env",
    safe: true,
    systemvars: true,
    silent: true,
    defaults: false,
  }),
];
