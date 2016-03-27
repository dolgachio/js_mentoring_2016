'use strict';

const Post = require('../models/post.js');
const CONST = require('../CONST');
const POSTS = CONST.POSTS;
const utils = require('../services/utils.js');

module.exports = {
    getPosts,
    getMyPosts,
    getMoreComments
};

function getPosts(req, res) {
    const user = utils.getUserPublicInterface(req.user);
    const limitAmount = req.query.limit || POSTS.DEF_LIMIT;

    utils.getPosts(null, limitAmount)
        .then(posts => {
            res.json({posts, user});
        })
}

function getMyPosts(req, res) {
    const user = utils.getUserPublicInterface(req.user);
    const limitAmount = req.query.limit || POSTS.DEF_LIMIT;
    const query = {postedBy: user ? user._id : ''};

    utils.getPosts(query, limitAmount)
        .then(posts => {
            res.json({posts, user});
        })
        .catch((error) => {
            res.status = '500';
            res.json({type: error});
        });
}

function getMoreComments(req, res) {
    const postId = req.query.postId || '';
    const limit = req.query.limit;

    return utils.getComments({_id: postId}, limit)
            .then(comments => {
                res.json(comments);
            })
}
