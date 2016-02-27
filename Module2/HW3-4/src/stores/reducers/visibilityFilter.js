'use strict';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch(action.type) {
        case 'SET_VISIBILITY':
            return action.payload.filter;
        default:
            return state;
    }
};

export default visibilityFilter;