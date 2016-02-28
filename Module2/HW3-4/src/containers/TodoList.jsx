'use strict';
import React from 'react';
import { connect } from 'react-redux';

import CONST from '../constants/CONST.js';
import actions from '../actions/actions.js';

import Todo from  './Todo.js';

const mapStateToProps = (state) => ({
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
});

const mapDispatchToProps = (dispatch) => {
    const toggleAll = (event) => {
        let checked = event.target.checked;
        dispatch(actions.toggleAll(checked))
    };

    return {
        toggleAll
    }
};

const TodoList = ({todos, visibilityFilter,toggleAll}) => {

    const getShownTodos = (todos, visibilityFilter) => {
        return todos.filter(function (todo) {
            switch (visibilityFilter) {
                case CONST.ACTIVE_TODOS:
                    return !todo.completed;
                case CONST.COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        });
    };

    let activeTodoCount = todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
    }, 0);

    let todoItems = getShownTodos(todos, visibilityFilter);
    let main;

    if (todos.length) {
        main = (
            <section className="main">
                <input
                    className="toggle-all"
                    type="checkbox"
                    onChange={toggleAll}
                    checked={activeTodoCount === 0}
                />
                <ul className="todo-list">
                    {todoItems.map( (todo) => {
                        return (<Todo
                                    todo={todo}
                                    key = {todo.id} />);
                        })}
                </ul>
            </section>
        );
    }

    return main;
};

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListContainer;



