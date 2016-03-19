'use strict';

const passport = require('passport');
require('../config/passport.js');
const Post = require('../models/posts.model.js');

module.exports = {
    getPosts
};


function getPosts(req, res) {
    _getPosts()
        .then(posts => {
            res.json(posts);
        })
}

function _getPosts() {
    return Post.find({})
        .populate('postedBy')
        .populate('comments.postedBy')

}
