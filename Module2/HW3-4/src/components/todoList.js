'use strict';
import React from 'react';
import connect from 'react-redux';

import CONST from '../constants/CONST.js';
import actions from '../actions/actions.js'

const mapStateToProps = (state) => ({
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
});

const mapDispatchToProps = (dispatch) => {
    const toggle = (todoToToggle) => {
        dispatch(actions.toggleTodo(todoToToggle))
    };

    const destroy = (todoToDestroy) => {
        dispatch(actions.toggleTodo(todoToDestroy))
    };

    const toggleAll = (event) => {
        let checked = event.target.checked;
        dispatch(actions.toggleAll(checked))
    };

    return {
        toggle,
        destroy,
        toggleAll
    }
};

const TodoList = ({todos, visibilityFilter, toggle, destroy, toggleAll}) => {

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
        }, this);
    };

    let activeTodoCount = todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
    }, 0);

    let todoItems = getShownTodos(todos, visibilityFilter).map( todo => {
        return (<TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggle}
            onDestroy={destroy}
            //onEdit={this.edit.bind(this, todo)}
            //editing={this.state.editing === todo.id}
            //onSave={this.save.bind(this, todo)}
            //onCancel={this.cancel.bind(this)}
        />);
    });

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
                    {todoItems}
                </ul>
            </section>
        );
    }

    return main;
};

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListContainer;



