'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const flash    = require('connect-flash');
const logger = require('morgan');
const multiparty = require('multiparty');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const config = require('./config');
const app = express();
const bootstrapRoutes = require('./api/routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.ROOT));

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

bootstrapRoutes(app);

module.exports = app;
