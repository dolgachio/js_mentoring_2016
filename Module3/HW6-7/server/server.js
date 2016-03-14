'use strict';

var fs = require('fs');
var express = require('express');
var multiparty = require('multiparty');
var http = require('http');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

http.createServer(app).listen(config.PORT, function(){
    console.log('Express server listening on port ' + config.PORT);
});

app.use(express.static(config.ROOT));