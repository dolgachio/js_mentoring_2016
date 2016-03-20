'use strict';

const passport = require('passport');
require('../config/passport.js');
const Post = require('../models/posts.model.js');
const CONST = require('../../constants');
const POSTS = CONST.POSTS;
const COMMENTS = CONST.COMMENTS;

module.exports = {
    getPosts,
    getMyPosts,
    addCommentToPost,
    removeCommentFromPost,
    getMoreComments
};


function getPosts(req, res) {
    const user = _getUser(req);
    const limitAmount = req.query.limit || POSTS.DEF_LIMIT;

    _getPosts(null, limitAmount)
        .then(posts => {
            res.json({posts, user});
        })
}

function getMyPosts(req, res) {
    const user = _getUser(req);
    const limitAmount = req.query.limit || POSTS.DEF_LIMIT;
    const query = {postedBy: user ? user._id : ''};

    _getPosts(query, limitAmount)
        .then(posts => {
            res.json({posts, user});
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

    console.log(postId);

    if(postId) {
        Post.findOne({_id: postId})
            .then(post => {
                post.comments.push({author: authorId, text: text});
                return post.save();
            })
            .then(post => {
                return _getComments({_id: postId});
            })
            .then((posts) => {
                res.json(posts.comments);
            });

        //TODO: find way to populate collection after update
        //Post.findOneAndUpdate(postId,
        //    {$push: {comments: {author: authorId, text: text}}}, {safe: true, new : true})
        //    .populate('comments.author')
        //    .then(post => {
        //        console.log(post);
        //
        //        res.json(post.comments);
        //    })
        //    .catch(err => {
        //        res.status(500);
        //        res.json({type: err});
        //    })
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
            return _getPosts({_id: postId});
        })
        .then((posts) => {
            res.json(posts[0].comments);
        });

        //TODO: find way to populate collection after update


    /*Post.findOneAndUpdate(postId, {$pull: {comments: {_id: commentId}}},{safe: true, upsert: true, new : true})
        .populate('comments.author')
        .then(post => {
            res.json(post.comments);
        })
        .catch(err => {
            res.status(500);
            res.json({type: err});
        })*/
}

function getMoreComments(req, res) {
    const postId = req.query.postId || '';
    const limit = req.query.limit;

    return _getComments({_id: postId}, limit)
            .then(post => {
                res.json(post.comments)
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

function _getUser(req) {
    const user = req.user;
    return user ? { email: user.local.email, _id: user._id} : null;
}

function _getNormalizedCommentsLimit(limitAmount) {
    let normalizedValue = parseInt(limitAmount, 10);

    return (0 - normalizedValue) || (0 - CONST.COMMENTS.DEF_LIMIT);
}
