'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users.model.js');
const CONST = require('../../constants');

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
            process.nextTick(function() {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newUser            = new User();
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.imageUrl = CONST.DEF_IMG;

                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            return done(null, user);
        });

}));

module.exports = passport;
