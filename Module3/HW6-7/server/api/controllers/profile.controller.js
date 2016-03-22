'use strict';

const Post = require('../models/posts.model.js');
const utils = require('../../services/utils.js');
const CONST = require('../../CONST');

module.exports = {
    createPost,
    getProfile,
    getImageUploadPage
};

function createPost(req, res) {
    if(req.isAuthenticated()) {

        const post = new Post({
            title: req.body.content,
            postedBy: req.user._id
        });

        return post.save()
            .then(() => {
                res.redirect('/profile');
            })
            .catch(() => {
                req.flash('postMessage', 'post creation error occured');
                res.redirect('/profile');
            })
    } else {
        req.flash('postMessage', 'you are not authorized');
        res.redirect('/profile');
    }
}

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
