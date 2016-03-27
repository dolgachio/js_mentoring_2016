'use strict';

const path = require('path');

module.exports = {
  ROOT: path.join(__dirname, '..', 'public'),
  PORT: 3000,

  session: {
    secret: 'secret'
  }
};
