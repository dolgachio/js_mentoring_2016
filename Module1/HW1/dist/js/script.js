(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var dispatcher = require('./modules/app.dispatcher.js');
var clockView = require('./modules/clock/clock-view.js');

module.exports = {};

},{"./modules/app.dispatcher.js":2,"./modules/clock/clock-view.js":4}],2:[function(require,module,exports){
'use strict';

module.exports = seal.dispatcher();

},{}],3:[function(require,module,exports){
'use strict';

var dispatcher = require('../app.dispatcher.js');
var store = seal.store(clockStore);

module.exports = dispatcher.createSubscriber(store);

function clockStore() {
    var _time = new Date();

    function get() {
        return _time;
    }

    function update(action, change) {
        if (action.type === 'UPDATE_TIME') {
            _time = new Date();
            change();
        }
    }

    return {
        update: update,
        get: get
    };
}

},{"../app.dispatcher.js":2}],4:[function(require,module,exports){
'use strict';

var clockStore = require('./clock-store.js');
var dispatcher = require('../app.dispatcher.js');

module.exports = seal.view(clockStore, clockView);

function clockView(subscribeToStore) {
    var UPDATE_TIME_BTN = '.js-update-time-btn';
    var UPDATE_TIME_EVENT = 'UPDATE_TIME';
    var HH_SELECTOR = '.js-clock .js-clock-hh';
    var MM_SELECTOR = '.js-clock .js-clock-mm';
    var SS_SELECTOR = '.js-clock .js-clock-ss';

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

        if (hh && mm && ss) {
            var time = store.get();
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

},{"../app.dispatcher.js":2,"./clock-store.js":3}]},{},[1])


//# sourceMappingURL=script.js.map
