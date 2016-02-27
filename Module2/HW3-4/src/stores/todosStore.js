'use strict';

import { createStore, combineReducers } from 'redux';
import todos from './reducers/todos.js';
import visibilityFilter from './reducers/visibilityFilter.js';

const rootReducer = combineReducers({
    todos,
    visibilityFilter
});

export default createStore(rootReducer);