'use strict';

const CONST = require('../CONST');

module.exports = {
    getNotifications,
    saveData
};

function getNotifications() {
    return localStorage.getItem(CONST.NOTIFICATIONS_STORAGE);
}

function saveData(data) {
    let notifications = JSON.parse(getNotifications()) || [];
    notifications.push(data);
    localStorage.setItem(CONST.NOTIFICATIONS_STORAGE, JSON.stringify(notifications));
}