'use strict';

module.exports = {
    add
};

function add(config = {}, successCb, failCb) {
    switch(config.type) {
        case 'calendar':
            window.plugins.calendar
                .createEvent(config.title, 'Sprinkle flower', 'sprinkle', config.startDate, config.endDate, successCb, failCb);
            break;

        case 'local':
            cordova.plugins.notification.local.schedule({
                id: guid(),
                message: config.title,
                at: config.startDate
            });
            successCb('');
            break;
        default:
            break;
    }
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}