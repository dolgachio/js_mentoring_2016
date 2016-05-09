'use strict';

const navigationService = require('../services/navigation.service.js');
const notifyService = require('../services/notify.service.js');
const notifyStore = require('../services/notify.store.js');

module.exports = {
    init: function () {
        return new Vue({
            el: '.state_add',
            data: {
                title: '',
                date: '',
                time: '',
                events: '',
                type: 'calendar'
            },
            methods: {
                toMainState: function () {
                    navigationService.go('MAIN');
                },

                addNotification: function () {
                    const normalizedDate = parseDate(this.date, this.time);

                    const successCb = () => {
                        notifyStore.saveData({title: this.title, date: normalizedDate, type: this.type});
                        cleanInputs(this);
                        alert('Notification is successfully created!');
                    };

                    function failCb() {
                        alert('Ooops! Something went wrong with adding notification, please, try one more time');
                    }

                    notifyService.add({
                        title: this.title,
                        startDate: normalizedDate,
                        endDate: normalizedDate,
                        type: this.type
                    }, successCb, failCb);

                },

                init: function () {
                    console.log('add state initialized');
                }
            }
        });
    }
};

function parseDate(dateString, timeString) {
    let yy;
    let mm;
    let dd;
    let hh;
    let min;
    let timeArr;

    let dateArr = dateString.split('-');
    yy = dateArr[0];
    mm = dateArr[1] === 0 ? 0 : dateArr[1] - 1;
    dd = dateArr[2];

    timeArr = timeString.split(':');
    hh = timeArr[0];
    min = timeArr[1];

    return new Date(yy, mm, dd, hh, min);
}


function cleanInputs(_this) {
    _this.$set('title', '');
    _this.$set('date', '');
    _this.$set('time', '');
    _this.$set('type', 'calendar');
}

