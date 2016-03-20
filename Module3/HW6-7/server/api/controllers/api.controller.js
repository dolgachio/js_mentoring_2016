'use strict';

const passport = require('passport');
require('../config/passport.js');
const Post = require('../models/posts.model.js');

module.exports = {
    getPosts,
    getMyPosts,
    addCommentToPost,
    removeCommentFromPost
};


function getPosts(req, res) {
    const user = _getUser(req);

    _getPosts()
        .then(posts => {
            res.json({posts, user});
        });
}

function getMyPosts(req, res) {
    const user = _getUser(req);
    const query = {postedBy: user ? user._id : ''};

    _getPosts(query)
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
            return _getPosts({_id: postId});
        })
        .then((posts) => {
            res.json(posts[0].comments);
        });


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

function _getPosts(query) {
    const normalizedQuery = query || {};

    return Post.find(normalizedQuery)
        .populate('postedBy')
        .populate('comments.author')
}

function _getUser(req) {
    const user = req.user;
    return user ? { email: user.local.email, _id: user._id} : null;
}
