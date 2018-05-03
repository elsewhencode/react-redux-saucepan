// todo: get most of the values from env variables
const { parsed } = require('dotenv').config();

const { PORT, HOST } = parsed || {};

const config = {
  WEB_PORT: PORT || '3000',
  ASSETS_PATH: '/assets/',
  HOST: HOST || '0.0.0.0',
};

module.exports = config;
