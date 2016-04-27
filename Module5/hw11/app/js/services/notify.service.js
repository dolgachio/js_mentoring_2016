'use strict';

module.exports = {
    add
};

function add(config = {}, successCb, failCb) {
    window.plugins.calendar
        .createEvent(config.title, 'Sprinkle flower', 'sprinkle', config.startDate, config.endDate, successCb, failCb);
}