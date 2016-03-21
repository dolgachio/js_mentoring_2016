'use strict';

require('./db');
const mongoose = require( 'mongoose' );
const bcrypt   = require('bcrypt-nodejs');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    local            : {
        name         : String,
        imageUrl     : String,
        email        : String,
        password     : String
    },
    github         : {
        id           : String,
        name  : String,
        imageUrl     : String,
        email        : String
    }
}, {collection: 'users'});

userSchema.plugin(findOrCreate);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
