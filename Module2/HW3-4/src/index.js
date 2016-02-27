import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/app.jsx';
import TodoModel from './components/todoModel.js';
import todosStore from './stores/todosStore.js';

import { Provider } from 'react-redux';

let model = new TodoModel('react-todos');

function render() {
    ReactDOM.render(
        <Provider store={todosStore}>
            <TodoApp model={model}/>
        </Provider>,

        document.getElementById('app'));
}

model.subscribe(render);
render();
