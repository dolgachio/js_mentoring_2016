'use strict';

const Post = require('../models/posts.model.js');
const CONST = require('../../CONST');
const POSTS = CONST.POSTS;
const utils = require('../../services/utils.js');

module.exports = {
    getPosts,
    getMyPosts,
    createPost,
    getMoreComments
};

function getPosts(req, res) {
    const user = utils.getUserPublicInterface(req.user);
    const limitAmount = req.query.limit || POSTS.DEF_LIMIT;

    utils.getPosts(null, limitAmount)
        .then(posts => {
            const normalizedPosts = utils.normalizePosts(posts);
            res.json({posts: normalizedPosts, user});
        })
}

function getMyPosts(req, res) {
    const user = utils.getUserPublicInterface(req.user);
    const limitAmount = req.query.limit || POSTS.DEF_LIMIT;
    const query = {postedBy: user ? user._id : ''};

    utils.getPosts(query, limitAmount)
        .then(posts => {
            const normalizedPosts = utils.normalizePosts(posts);
            res.json({posts: normalizedPosts, user});
        })
        .catch((error) => {
            res.status = '500';
            res.json({type: error});
        });
}

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

function getMoreComments(req, res) {
    const postId = req.query.postId || '';
    const limit = req.query.limit;

    return utils.getComments({_id: postId}, limit)
            .then(comments => {
                res.json(comments);
            })
}