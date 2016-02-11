'use strict';

var clockStore = require('../stores/clock.store.js');
var actions = require('../actions/app.actions.js');
var view =  seal.View(clockView);

clockStore.addChangeListener(onChange);
module.exports = view;

function clockView() {
    const UPDATE_TIME_BTN = '.js-update-time-btn';
    const HH_SELECTOR = '.js-clock .js-clock-hh';
    const MM_SELECTOR = '.js-clock .js-clock-mm';
    const SS_SELECTOR = '.js-clock .js-clock-ss';

    let _updateBtn;
    let _timer;
    let _view = {
        init: init,

        updateState: updateState,

        updateView: updateView,

        render: render,
        afterRender: afterRender,

        destroy: destroy
    };

    return _view;

    function init() {
        _updateBtn = document.querySelector(UPDATE_TIME_BTN);

        _timer = setInterval(function() {
            updateTime();
        }, 200);

        if(_updateBtn) {
            _updateBtn.addEventListener('click', stopTime);
        }
    }

    function updateState() {
        var data = clockStore.getValue();
        _view.state = _view.state || {};
        _view.state.time = data;

        _view.updateView();
    }

    function updateView() {
        _view.render();
        _view.afterRender();
    }

    function render() {
        var hh = document.querySelector(HH_SELECTOR);
        var mm = document.querySelector(MM_SELECTOR);
        var ss = document.querySelector(SS_SELECTOR);

        if(hh && mm && ss) {
            let time = _view.state.time;
            hh.innerHTML = _normalizeNumber(time.getHours());
            mm.innerHTML = _normalizeNumber(time.getMinutes());
            ss.innerHTML = _normalizeNumber(time.getSeconds());
        }
    }

    function afterRender() {

    }

    function destroy() {
        if(_timer) {
            clearInterval(_timer);
        }
    }

    function _normalizeNumber(number) {
        var normalizedNumber = parseInt(number, 10);

        return normalizedNumber < 10 ? '0' + normalizedNumber : normalizedNumber;
    }

    function updateTime() {
        actions.updateTime(new Date());
    }

    function stopTime() {
        clearInterval(_timer);
        console.log(_timer);
    }
}

function onChange() {
    view.updateState();
}