'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var multiparty = require('multiparty');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var config = require('./config');
var routes = require('./routes');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.ROOT));

app.use('/', routes);

module.exports = app;
