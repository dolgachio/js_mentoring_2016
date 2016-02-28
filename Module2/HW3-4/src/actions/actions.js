'use strict';
import ACTIONS_NAMES from '../constants/ACTIONS_NAMES.js';

export default {

    //------Todos action------
    toggleTodo(id) {
        return {
            type: ACTIONS_NAMES.TOGGLE_TODO,
            id: id
        }
    },

    destroyTodo(id) {
        return {type: ACTIONS_NAMES.DESTROY_TODO, id: id};
    },

    toggleAll(checked) {
        return {
            type: ACTIONS_NAMES.TOGGLE_ALL,
            checked: checked
        }
    },

    addTodo(todo) {
        return Object.assign({}, {type: ACTIONS_NAMES.ADD_TODO}, todo);
    },

    updateTodo(todo) {
        return {
            type: ACTIONS_NAMES.UPDATE_TODO,
            id: todo.id,
            title: todo.title
        }
    },

    editTodo(id) {
        return {
            type: ACTIONS_NAMES.EDIT_TODO,
            id: id
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