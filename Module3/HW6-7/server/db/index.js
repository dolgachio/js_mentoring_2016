'use strict';

var mongoose = require('mongoose');
var bootstrap = require('./bootstrap');
var usersSchema = require('./schemas/users-schema.js');
var users = mongoose.model('users', usersSchema);

bootstrap();

module.exports = {
    getUsers: getUsers
};

function getUsers() {
    return users.find({});
}
