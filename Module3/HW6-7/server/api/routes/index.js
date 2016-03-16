'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');

const passport = require('passport');
require('../config/passport.js');

const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');

const CONST = require('../../constants');

router.get('/', (req, res) => {
    /*res.render('index', {
        name: CONST.UNAUTH.NAME,
        message: CONST.UNAUTH.MESSAGE,
        link: CONST.LINKS.LOGIN,
        unauthorized: true
    });*/
    res.redirect('/profile')

});

router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') })
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/signup', (req, res) => {
   res.render('signup', {});
});

router.get('/profile', function(req, res) {
    ctrlProfile.getPosts()
        .then(posts => {
            if(req.isAuthenticated()) {
                res.render('profile', {
                    email : req.user.local.email, // get the user out of session and pass to template
                    authorized: true,
                    posts: posts,
                    message: req.flash('postMessage')
                });

            } else {
                res.render('profile', {
                    email: 'stranger',
                    authorized: false,
                    posts: posts,
                    message: req.flash('postMessage')
                });
            }
        })
});

router.post('/signup', ctrlAuth.signUp);
router.post('/login', ctrlAuth.login);

router.post('/createPost', ctrlProfile.createPost);

function _isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }


    // if they aren't redirect them to the home page
    res.redirect('/');
}


/*router.get('/register', (req, res) => {
    res.render('register', {});
});

// profile
router.get('/profile', ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);

router.post('/login', ctrlAuth.login);*/

module.exports = router;
