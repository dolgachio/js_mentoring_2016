/*global cordova, module*/
var ADD_EVENT_ACTION = 'addEvent';
var ADD_EVENT_INTERACTIVELY_ACTION = 'addEventInteractively';

module.exports = {
    addEvent: addEventMethodFactory(ADD_EVENT_ACTION),
    addEventInteractively: addEventMethodFactory(ADD_EVENT_INTERACTIVELY_ACTION)
};

function addEventMethodFactory(action) {
    return function (title, description, startDate, endDate, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'MyCalendar',
            action,
            [{
                "title": title,
                "description": description,
                "startDate": startDate.getTime(),
                "endDate": endDate.getTime()
            }]);
    }
}
