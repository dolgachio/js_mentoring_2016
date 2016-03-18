'use strict';

const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/auth.controller.js');

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

router.post('/signup', ctrlAuth.signUp);
router.post('/login', ctrlAuth.login);

function _isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;