'use strict';
import Todo from  '../containers/Todo.jsx';
import React from 'react';

import Toggle from 'material-ui/lib/toggle';

const TodoList = ({todos, onToggleAll, activeTodoCount}) => {
    return (
        <section className="main">
            <Toggle
                style={{position: 'absolute', top: '-45px', left: '5px', width: 0}}
                type="checkbox"
                onToggle={onToggleAll}
                toggled={activeTodoCount === 0}
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
