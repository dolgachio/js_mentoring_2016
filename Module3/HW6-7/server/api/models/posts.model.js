'use strict';

require('./db');
const mongoose = require( 'mongoose' );
const bcrypt   = require('bcrypt-nodejs');

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String
    }
);

const postSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
},{collection: 'posts'});

module.exports = mongoose.model('Post', postSchema);
