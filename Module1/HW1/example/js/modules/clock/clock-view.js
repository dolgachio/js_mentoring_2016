'use strict';

var clockStore = require('./clock-store.js');
var dispatcher = require('../app.dispatcher.js');

module.exports = seal.view(clockStore, clockView);

function clockView(subscribeToStore) {
    const UPDATE_TIME_BTN = '.js-update-time-btn';
    const UPDATE_TIME_EVENT = 'UPDATE_TIME';
    const HH_SELECTOR = '.js-clock .js-clock-hh';
    const MM_SELECTOR = '.js-clock .js-clock-mm';
    const SS_SELECTOR = '.js-clock .js-clock-ss';

    var updateBtn;
    var updateTime;
    var _store;

    init();
    subscribeToStore(render);

    return {
        render: render,
        init: init
    };

    function render(store) {
        _store = store;
        var hh = document.querySelector(HH_SELECTOR);
        var mm = document.querySelector(MM_SELECTOR);
        var ss = document.querySelector(SS_SELECTOR);

        if(hh && mm && ss) {
            let time = store.get();
            hh.innerHTML = _normalizeNumber(time.getHours());
            mm.innerHTML = _normalizeNumber(time.getMinutes());
            ss.innerHTML = _normalizeNumber(time.getSeconds());
        }
    }

    function _normalizeNumber(number) {
        var normalizedNumber = parseInt(number, 10);

        return normalizedNumber < 10 ? '0' + normalizedNumber : normalizedNumber;
    }

    function init() {
        updateBtn = document.querySelector(UPDATE_TIME_BTN);
        updateTime = dispatcher.createAction(UPDATE_TIME_EVENT);
        updateBtn.addEventListener('click', function () {
            updateTime();
        });
    }
}