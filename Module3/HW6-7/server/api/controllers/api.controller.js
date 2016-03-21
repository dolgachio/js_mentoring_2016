'use strict';

const passport = require('passport');
require('../config/passport.js');
const Post = require('../models/posts.model.js');
const CONST = require('../../constants');
const POSTS = CONST.POSTS;
const utils = require('../../services/utils.js');

module.exports = {
    getPosts,
    getMyPosts,
    addCommentToPost,
    removeCommentFromPost,
    getMoreComments
};

function getPosts(req, res) {
    const user = utils.getUserPublicInterface(req.user);
    const limitAmount = req.query.limit || POSTS.DEF_LIMIT;

    _getPosts(null, limitAmount)
        .then(posts => {
            const normalizedPosts = utils.normalizePosts(posts);
            res.json({posts: normalizedPosts, user});
        })
}

function getMyPosts(req, res) {
    const user = utils.getUserPublicInterface(req.user);
    const limitAmount = req.query.limit || POSTS.DEF_LIMIT;
    const query = {postedBy: user ? user._id : ''};

    _getPosts(query, limitAmount)
        .then(posts => {
            const normalizedPosts = utils.normalizePosts(posts);
            res.json({posts: normalizedPosts, user});
        })
        .catch((error) => {
            res.status = '500';
            res.json({type: error});
        });
}

function addCommentToPost(req, res) {
    let authorId = req.user._id;
    let postId = req.body.postId;
    let text = req.body.text;

    if(postId) {
        Post.findOne({_id: postId})
            .then(post => {
                post.comments.push({author: authorId, text: text});
                return post.save();
            })
            .then(post => {
                return _getComments({_id: postId});
            })
            .then((post) => {
                const normalizedComments = utils.normalizeComments(post.comments);
                res.json(normalizedComments);
            });

        //TODO: find way to populate collection after update
    } else {
        res.status(500);
        res.json({type: 'Internal Error'})
    }
}

function removeCommentFromPost(req, res) {
    const postId = req.body.postId;
    const commentId = req.body.commentId;

    Post.findOne({_id: postId})
        .then(post => {
            post.comments.id(commentId).remove();
            return post.save();
        })
        .then(post => {
            return _getComments({_id: postId});
        })
        .then((post) => {
            const normalizedComments = utils.normalizeComments(post.comments);
            res.json(normalizedComments);
        });

        //TODO: find way to populate collection after update
}

function getMoreComments(req, res) {
    const postId = req.query.postId || '';
    const limit = req.query.limit;

    return _getComments({_id: postId}, limit)
            .then(post => {
                const normalizedComments = utils.normalizeComments(post.comments);
                res.json(normalizedComments);
            })
}

function _getPosts(query, postsLimit) {
    const normalizedQuery = query || {};
    const normalizedPostsLimit = postsLimit || POSTS.DEF_LIMIT;
    const commentsLimit = _getNormalizedCommentsLimit();
    console.log(commentsLimit);

    return Post.find(normalizedQuery, {comments: {$sort: [['_id', -1]] }})
        .slice('comments', commentsLimit)
        .sort([['_id', -1]])
        .limit(normalizedPostsLimit)
        .populate('postedBy')
        .populate('comments.author')
}

function _getComments(postId, commentsLimit) {
    const normalizedCommentsLimit = _getNormalizedCommentsLimit(commentsLimit);

    return Post.findOne({_id: postId})
        .slice('comments', normalizedCommentsLimit)
        .populate('postedBy')
        .populate('comments.author');
}

function _getNormalizedCommentsLimit(limitAmount) {
    let normalizedValue = parseInt(limitAmount, 10);

    return (0 - normalizedValue) || (0 - CONST.COMMENTS.DEF_LIMIT);
}
