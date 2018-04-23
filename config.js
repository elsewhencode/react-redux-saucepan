// todo: get most of the values from env variables
const { parsed } = require('dotenv').config();

const config = {
  WEB_PORT: parsed ? parsed.PORT : '3000',
  ASSETS_PATH: '/assets/',
  HOST: parsed ? parsed.HOST : '0.0.0.0',
  APP_NAME: 'My Pension Solution',
};

module.exports = config;
