'use strict';
import React from 'react';
import director from 'director';

import CONST from '../constants/CONST.js';
import AddTodo from '../containers/addTodo.jsx'
import TodoList from '../containers/VisibleTodoList.jsx'
import TodoFooter from './Footer.jsx';

const Router = director.Router;
class TodoApp extends React.Component {
    componentDidMount () {
        let { onFilterChange } = this.props;

        let router = Router({
            '/': onFilterChange.bind(null, CONST.ALL_TODOS),
            '/active': onFilterChange.bind(null, CONST.ACTIVE_TODOS),
            '/completed': onFilterChange.bind(null, CONST.COMPLETED_TODOS)
        });
        router.init('/');
    }

    render() {
        let {activeTodoCount, completedCount, hasTodos} = this.props;

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
    }
}

export default TodoApp;
