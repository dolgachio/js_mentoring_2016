'use strict';

const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/auth.controller.js');

//local
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

//Github
router.get('/login/github', ctrlAuth.loginGithub);
router.get('/login/github/callback', ctrlAuth.loginGithub, ctrlAuth.loginGithubCallback);

module.exports = router;