// @flow
// todo: get most of the values from env variables
const { parsed } = require('dotenv').config();

const { PORT, HOST } = parsed || {};

type ConfigType = {
  WEB_PORT: number,
  ASSETS_PATH: string,
  HOST: string,
};

const config: ConfigType = {
  // PORT will be of type String when loaded into our program
  WEB_PORT: parseInt(PORT, 10) || 3000,
  ASSETS_PATH: '/assets/',
  HOST: HOST || '0.0.0.0',
};

module.exports = config;
