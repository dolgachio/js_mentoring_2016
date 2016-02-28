'use strict';
import ACTIONS_NAMES from '../constants/ACTIONS_NAMES.js';

const todo = (state, action) => {
    switch(action.type) {
        case ACTIONS_NAMES.ADD_TODO:
            return {
                id: action.id,
                title: action.title,
                completed: false
            };

        case ACTIONS_NAMES.TOGGLE_TODO:
            if(state.id !== action.id) {
                return state;
            }

            return Object.assign({},
                state,
                {completed: !state.completed}
            );

        case ACTIONS_NAMES.UPDATE_TODO:
            if(state.id !== action.id) {
                return state;
            }

            return Object.assign({},
                state,
                {title: action.title});

        default:
            return state;
    }
};

export default todo;
