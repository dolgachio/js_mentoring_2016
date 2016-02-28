'use strict';
import { combineReducers } from 'redux';

import todos from './todos.js';
import visibilityFilter from './visibilityFilter.js';
import editingTodo from './editingTodo.js';

const rootReducer = combineReducers({
    todos,
    visibilityFilter,
    editingTodo
});

export default rootReducer;