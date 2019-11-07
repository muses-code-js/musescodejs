require('dotenv').config();

const meetup = require('../config');
const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';

module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    meetup,
    serverUrl,
  },
};
