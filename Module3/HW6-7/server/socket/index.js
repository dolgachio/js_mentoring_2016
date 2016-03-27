'use strict';

const config = require('../config');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const User = require('../models/user.js');
const sessionStore = require('../services/session-store');
const addCommentsHandlers = require('./comments');
const addPostsHandlers = require('./posts');

module.exports = function (server) {
    const io = require('socket.io')(server);

    io.use(function(socket, next) {
        cookieParser(config.session.secret)(socket.request, {}, function(err) {
            const sessionId = socket.request.signedCookies['connect.sid'];

            sessionStore.get(sessionId, function(err, session) {
                socket.request.session = session;

                passport.initialize()(socket.request, {}, function() {
                    passport.session()(socket.request, {}, function() {
                        if (socket.request.user) {
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
        addPostsHandlers(socket, io);
    });
};
