'use strict';

const Post = require('../models/post.js');
const utils = require('../services/utils');

module.exports = (socket, io) => {
    socket.on('addComment', newComment => {
        const req = socket.request;
        let authorId = req.user._id;
        let postId = newComment.postId;
        let text = newComment.text;

        if(postId) {
            Post.findOne({_id: postId})
                .then(post => {
                    post.comments.push({author: authorId, text: text});
                    return post.save();
                })
                .then(post => {
                    return utils.getComments({_id: postId});
                })
                .then((comments) => {
                    //socket.emit('updateComments', {postId, comments});
                    io.sockets.emit('updateComments', {postId, comments});
                });

            //TODO: find way to populate collection after update
        }
    });

    socket.on('removeComment', comment => {
        const postId = comment.postId;
        const commentId = comment.commentId;

        Post.findOne({_id: postId})
            .then(post => {
                post.comments.id(commentId).remove();
                return post.save();
            })
            .then(post => {
                return utils.getComments({_id: postId});
            })
            .then((comments) => {
                //socket.emit('updateComments', {postId, comments});
                //socket.broadcast.emit('updateComments', {postId, comments});
                io.sockets.emit('updateComments', {postId, comments});
            });
    })
};