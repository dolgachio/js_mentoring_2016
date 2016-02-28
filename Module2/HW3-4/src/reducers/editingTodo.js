'use strict';
import ACTIONS_NAMES from '../constants/ACTIONS_NAMES.js';

const editingTodo = (state = null, action) => {
    switch(action.type) {
        case ACTIONS_NAMES.EDIT_TODO:
            return action.id;

        default:
            return state;
    }
};

export default editingTodo;