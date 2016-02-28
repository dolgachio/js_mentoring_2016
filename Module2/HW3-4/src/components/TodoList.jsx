'use strict';
import Todo from  '../containers/Todo.jsx';
import React from 'react';

const TodoList = ({todos, onToggleAll, activeTodoCount}) => {
    return (
        <section className="main">
            <input
                className="toggle-all"
                type="checkbox"
                onChange={onToggleAll}
                checked={activeTodoCount === 0}
            />
            <ul className="todo-list">
                {todos.map( (todo) => {
                    return (<Todo
                        todo={todo}
                        key = {todo.id} />);
                    })}
            </ul>
        </section>
    );
};

export default TodoList;
