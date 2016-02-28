'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage'

//reducers
import todos from './reducers/todos.js';
import visibilityFilter from './reducers/visibilityFilter.js';
import editingTodo from './reducers/editingTodo.js';
import TodoApp from './containers/App.jsx';

const createPersistentStore = compose(
    persistState()
)(createStore);

const rootReducer = combineReducers({
    todos,
    visibilityFilter,
    editingTodo
});

const store = createPersistentStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('app'));

