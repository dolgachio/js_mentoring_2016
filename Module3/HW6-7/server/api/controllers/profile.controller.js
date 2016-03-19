'use strict';

const passport = require('passport');
require('../config/passport.js');
const Post = require('../models/posts.model.js');

module.exports = {
    createPost: createPost,
    getProfile: getProfile
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
    _getPosts()
        .then(posts => {
            if(req.isAuthenticated()) {
                res.render('profile', {
                    email : req.user.local.email, // get the user out of session and pass to template
                    authorized: true,
                    message: req.flash('postMessage')
                });

            } else {
                res.render('profile', {
                    email: 'stranger',
                    authorized: false,
                    message: req.flash('postMessage')
                });
            }
        })
}


function _getPosts() {
    return Post.find({})
            .populate('postedBy')
            .populate('comments.postedBy')

}
