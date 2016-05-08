/*global cordova, module*/

module.exports = {
    addEvent: function (title, description, startDate, endDate, successCallback, errorCallback) {
        cordova.exec(
        successCallback,
        errorCallback,
        'MyCalendar',
        'addEvent',
        [{
            "title": title,
            "description": description,
            "startDate": startDate.getTime(),
            "endDate": endDate.getTime()
        }]);
    }
};
