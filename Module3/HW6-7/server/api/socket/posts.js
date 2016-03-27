'use strict';

const Post = require('../models/post.js');
const utils = require('../../services/utils');

module.exports = (socket, io) => {
    socket.on('createPost', (data) => {
        const req = socket.request;
        const postedBy = req.user._id;
        const text = data.text;

        const post = new Post({
            title: text,
            postedBy: postedBy
        });

        return post.save()
            .then(() => {
                return  utils.getPosts();
            })
            .then((posts) => {
                const normalizedPosts = utils.normalizePosts(posts);
                io.sockets.emit('updatePosts', {posts: normalizedPosts});
            })
            .catch((err) => {
                console.log(err);
            })
    })



};