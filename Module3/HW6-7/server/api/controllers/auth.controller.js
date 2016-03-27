'use strict';

const passport = require('passport');
require('../auth/passport.js');
require('../auth/passport-github.js');

module.exports.signUp = passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
});

module.exports.login = passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
});

module.exports.loginGithub = passport.authenticate('github',  {
        failureRedirect: '/login',
        failureFlash: true
});

module.exports.loginGithubCallback = (req, res) => {
    res.redirect('/profile')
};
