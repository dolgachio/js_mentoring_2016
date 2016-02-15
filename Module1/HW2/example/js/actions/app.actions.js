'use strict';

var dispatcher = require('../dispatcher/app.dispatcher.js');
var CONSTANTS = require('../CONSTANTS/app.constants.js');

module.exports = {
    updateTime: dispatcher.handleAction(CONSTANTS.UPDATE_TIME),
    addMentee: dispatcher.handleAction(CONSTANTS.ADD_MENTEE)
};