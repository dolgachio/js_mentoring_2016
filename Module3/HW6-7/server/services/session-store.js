'use strict';

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('../models/db');

const sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;