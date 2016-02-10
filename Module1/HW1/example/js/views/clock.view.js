'use strict';

var clockStore = require('../stores/clock.store.js');
var actions = require('../actions/app.actions.js');
var view =  new seal.View(clockView);

clockStore.addChangeListener(function () {
    view.updateState();
});

module.exports = view;

function clockView() {
    const UPDATE_TIME_BTN = '.js-update-time-btn';
    const HH_SELECTOR = '.js-clock .js-clock-hh';
    const MM_SELECTOR = '.js-clock .js-clock-mm';
    const SS_SELECTOR = '.js-clock .js-clock-ss';

    var _updateBtn;

    init();

    return {
        init: init,

        setState: setState,
        updateState: updateState,

        updateView: updateView,

        render: render,
        afterRender: afterRender,

        destroy: destroy
    };

    function init() {
        _updateBtn = document.querySelector(UPDATE_TIME_BTN);
        updateTime();

        if(_updateBtn) {
            _updateBtn.addEventListener('click',updateTime);
        }
    }

    function updateState() {
        var data = clockStore.getValue();
        var state = {time: data};

        this.setState(state);
    }

    function setState(state) {
        this.state = this.state || {};
        state = state || {};

        this.state.time = state.time;

        this.updateView();
    }

    function updateView() {
        this.render();
        this.afterRender();
    }

    function render() {
        var hh = document.querySelector(HH_SELECTOR);
        var mm = document.querySelector(MM_SELECTOR);
        var ss = document.querySelector(SS_SELECTOR);

        if(hh && mm && ss) {
            let time = this.state.time;
            hh.innerHTML = _normalizeNumber(time.getHours());
            mm.innerHTML = _normalizeNumber(time.getMinutes());
            ss.innerHTML = _normalizeNumber(time.getSeconds());
        }
    }

    function afterRender() {

    }

    function destroy() {
        _updateBtn.removeEventListener('click', updateTime);
    }

    function _normalizeNumber(number) {
        var normalizedNumber = parseInt(number, 10);

        return normalizedNumber < 10 ? '0' + normalizedNumber : normalizedNumber;
    }

    function updateTime() {
        actions.updateTime(new Date());
    }


}