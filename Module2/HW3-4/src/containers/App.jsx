'use strict';

import React from 'react';
import { connect } from 'react-redux';

import AddTodo from './addTodo.jsx'
import TodoList from './VisibleTodoList.jsx'
import TodoFooter from '../components/Footer.jsx';

const mapStateToProps = (state) => {
    let activeTodoCount = state.todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
    }, 0);

    let completedCount = state.todos.length - activeTodoCount;
    let hasTodos = state.todos.length > 0;

    return {
        activeTodoCount,
        completedCount,
        hasTodos
    }
};

const TodoApp = ({activeTodoCount, completedCount, hasTodos}) => {
        let footer;
        let main;

        if (activeTodoCount || completedCount) {
            footer =
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                />;
        }

        if (hasTodos) {
            main = (
                <TodoList />
            );
        }

        return (
            <div>
                <AddTodo/>
                {main}
                {footer}
            </div>
        );

};

const TodoAppContainer = connect(mapStateToProps)(TodoApp);

export default TodoAppContainer;
