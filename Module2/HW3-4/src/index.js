import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/app.jsx';
import TodoModel from './components/todoModel.js';

let model = new TodoModel('react-todos');

function render() {
    ReactDOM.render(
        <TodoApp model={model}/>,
        document.getElementById('app'));
}

model.subscribe(render);
render();
