var mongoose = require('mongoose');
var User = require('../models/users.js');
var Post = require('../models/posts.js');

module.exports = {
    createPost: createPost,
    getPosts: getPosts
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

function getPosts() {
    return Post.find({})
            .populate('postedBy')
            .populate('comments.postedBy')

}
