'use strict';

const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/user.js')


passport.serializeUser(function(user, done) {
    done(null, user.github.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GithubStrategy({
    clientID: 'b9b320d7a972fb99d123',
    clientSecret: '6ea8802bb10c40741c18624fe641bfa2bd184985',
    callbackURL: 'http://localhost:3000/login/github/callback'
}, function(accessToken, refreshToken, profile, done){
    process.nextTick(function() {
        User.findOrCreate({'github.id': profile.id},
            function(err, user/*, created*/){
                if (err) {
                    console.log(err);
                }

                user.github.name = profile.displayName;
                user.github.email = profile._json.email;
                user.github.imageUrl = profile._json.avatar_url;

                user.save(function (err, user) {
                    done(null, user)
                });
        });
    });
}));
