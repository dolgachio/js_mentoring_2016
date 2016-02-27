'use strict';
import ACTIONS_NAMES from '../../constants/ACTIONS_NAMES.js';

const todo = (state, action) => {
    let payload = action.payload;

    switch(action.type) {
        case ACTIONS_NAMES.ADD_TODO:
            return {
                id: payload.id,
                title: payload.title,
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

        default:
            return state;
    }
};

export default todo;
