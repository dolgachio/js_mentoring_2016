'use strict';

const passport = require('passport');
require('../config/passport.js');
require('../config/passport-github.js');

module.exports.signUp = passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true
});

module.exports.login = passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
});

module.exports.loginGithub = passport.authenticate('github',  {
        failureRedirect: '/login',
        failureFlash: true
});

module.exports.loginGithubCallback = (req, res) => {
    res.redirect('/profile')
};
