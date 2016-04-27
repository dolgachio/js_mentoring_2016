'use strict';

const CONST = require('../CONST');
const STATES = CONST.STATES;
const DEFAULT_STATE = CONST.DEFAULT_STATE;
const HIDE_CLASS = CONST.HIDE_CLASS;
let initiators;

module.exports = {
    init,
    go
};

function go(stateName) {
    for(let prop in STATES) {
        if(STATES.hasOwnProperty(prop)) {
            const el = document.querySelector(STATES[prop]);

            if(prop === stateName) {
                el.classList.remove(HIDE_CLASS);

                if(initiators.hasOwnProperty(stateName)) {
                    initiators[stateName]();
                }

            } else {
                el.classList.add(HIDE_CLASS);
            }
        }
    }
}

function init(config) {
    initiators = config;
    go(DEFAULT_STATE);
}
