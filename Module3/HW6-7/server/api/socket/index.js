'use strict';

var config = require('../../config');
var connect = require('connect'); // npm i connect
var async = require('async');
var cookie = require('cookie');   // npm i cookie
var sessionStore = require('../../services/session-store');
var User = require('../models/users.model.js');
var Post = require('../models/posts.model.js');
var utils = require('../../services/utils');

const cookieParser = require('cookie-parser');
const  passport = require('passport');
const addCommentsHandlers = require('./comments');
const addPostHandlers = require('./post');

module.exports = function (server) {
    const io = require('socket.io')(server);

    io.use(function(socket, next) {
        cookieParser(config.session.secret)(socket.request, {}, function(err) {
            var sessionId = socket.request.signedCookies['connect.sid'];

            sessionStore.get(sessionId, function(err, session) {
                socket.request.session = session;

                passport.initialize()(socket.request, {}, function() {
                    passport.session()(socket.request, {}, function() {
                        if (socket.request.user) {
                            console.log('User', socket.request.user);

                            next(null, true);
                        } else {
                            next(new Error('User is not authenticated'), false);
                        }
                    })
                });
            });
        });
    });

    io.on('connection', function (socket) {
        addCommentsHandlers(socket, io);
        addPostHandlers(socket, io);
    });
};
