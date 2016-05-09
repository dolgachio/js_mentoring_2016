'use strict';
const CONST = require('../CONST');
const NOTIFY_TYPES = CONST.NOTIFY_TYPES;

module.exports = {
    add
};

function add(config = {}, successCb, failCb) {
    switch(config.type) {
        case NOTIFY_TYPES.CALENDAR:
            plugins.calendar
                .createEvent(config.title, 'Water flower', 'sprinkle', config.startDate, config.endDate, successCb, failCb);
            break;

        case NOTIFY_TYPES.LOCAL:
            cordova.plugins.notification.local.schedule({
                id: guid(),
                message: config.title,
                at: config.startDate
            });
            successCb();
            break;

        case NOTIFY_TYPES.CUSTOM_CALENDAR:
            MyCalendar.addEvent(config.title, 'Water flower', config.startDate, config.endDate, successCb, failCb);
            break;

        default:
            break;
    }
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}