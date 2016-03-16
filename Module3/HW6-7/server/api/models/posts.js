'use strict';

require('./db');
const mongoose = require( 'mongoose' );
const bcrypt   = require('bcrypt-nodejs');

const postsSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
},{collection: 'posts'});


module.exports = mongoose.model('Post', postsSchema);
