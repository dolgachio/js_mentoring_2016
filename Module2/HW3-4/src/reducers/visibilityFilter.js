'use strict';
import ACTIONS_NAMES from '../constants/ACTIONS_NAMES.js';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch(action.type) {
        case ACTIONS_NAMES.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export default visibilityFilter;