'use strict';
import ACTIONS_NAMES from '../constants/ACTIONS_NAMES.js';

export default {

    //------Todos action------
    toggleTodo(todo) {
        return {
            type: ACTIONS_NAMES.TOGGLE_TODO,
            payload: {todo: todo}
        };
    },

    destroyTodo(todo) {
        return {
            type: ACTIONS_NAMES.DESTROY_TODO,
            payload: {todo: todo}
        }
    },

    toggleAll(checked) {
        return {
            type: ACTIONS_NAMES.TOGGLE_ALL,
            payload: {checked: checked}
        }
    },

    addTodo(todo) {
        return {
            type: ACTIONS_NAMES.ADD_TODO,
            payload: {todo}
        }
    },

    clearCompleted() {
        return {
            type: ACTIONS_NAMES.CLEAR_COMPLETED
        }
    },

    //------Filter action------
    setVisibilityFilter(filter) {
        return {
            type: ACTIONS_NAMES.SET_VISIBILITY_FILTER,
            filter: filter
        }
    }

}