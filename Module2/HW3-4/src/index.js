'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage'

import rootReducer from './reducers';
import TodoApp from './containers/App.jsx';

const createPersistentStore = compose(
    persistState()
)(createStore);

const store = createPersistentStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('app'));

