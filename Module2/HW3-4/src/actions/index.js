'use strict';
import ACTIONS_NAMES from '../constants/ACTIONS_NAMES.js';

//------Todos action------
export const toggleAll = (checked) => {
    return {
        type: ACTIONS_NAMES.TOGGLE_ALL,
        checked: checked
    }
};

export const toggleTodo = (id) => {
    return {
        type: ACTIONS_NAMES.TOGGLE_TODO,
        id: id
    }
};

export const destroyTodo = (id) => {
    return {type: ACTIONS_NAMES.DESTROY_TODO, id: id};
};

export const addTodo = (todo) => {
    return Object.assign({}, {type: ACTIONS_NAMES.ADD_TODO}, todo);
};

export const updateTodo = (todo) => {
    return {
        type: ACTIONS_NAMES.UPDATE_TODO,
        id: todo.id,
        title: todo.title
    }
};

export const editTodo = (id) => {
    return {
        type: ACTIONS_NAMES.EDIT_TODO,
        id: id
    }
};

export const clearCompleted = () => {
    return {
        type: ACTIONS_NAMES.CLEAR_COMPLETED
    }
};

//------Filter action------
export const setVisibilityFilter = (filter) => {
    return {
        type: ACTIONS_NAMES.SET_VISIBILITY_FILTER,
        filter: filter
    }
};


