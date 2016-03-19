'use strict';

const passport = require('passport');
require('../config/passport.js');
const Post = require('../models/posts.model.js');

module.exports = {
    getPosts,
    getMyPosts
};


function getPosts(req, res) {
    _getPosts()
        .then(posts => {
            res.json(posts);
        })
}

function getMyPosts(req, res) {
    const user = req.user || {_id: ''};

    _getPosts({postedBy: user._id})
        .then(posts => {
            res.json(posts);
        });
}

function _getPosts(query) {
    const normalizedQuery = query || {};

    return Post.find(normalizedQuery)
        .populate('postedBy')
        .populate('comments.postedBy')
}
