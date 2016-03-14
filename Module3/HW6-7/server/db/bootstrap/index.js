'use strict';

var mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://sdolgachov:sami-317r@ds015289.mlab.com:15289/wall');
};

