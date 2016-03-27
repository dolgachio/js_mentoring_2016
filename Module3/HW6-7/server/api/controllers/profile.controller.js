'use strict';

const Post = require('../models/posts.model.js');
const utils = require('../../services/utils.js');
const CONST = require('../../CONST');

module.exports = {
    getProfile,
    getImageUploadPage
};

function getProfile(req, res) {
        if(req.isAuthenticated()) {
            const user = utils.getUserPublicInterface(req.user);

            res.render('profile', {
                email : user.email,
                authorized: true,
                message: req.flash('postMessage'),
                image: user.imageUrl
            });
        } else {
            res.render('profile', {
                email: 'stranger',
                authorized: false,
                message: req.flash('postMessage')
            });
        }
}

function getImageUploadPage(req, res) {
    const strategy = utils.getCurrentStrategy(req.user);

    let renderOptions = {};
    renderOptions.allowed = strategy === CONST.STRATEGY.LOCAL;

    res.render('load-img', renderOptions);
}
