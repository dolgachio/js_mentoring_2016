'use strict';
import { connect } from 'react-redux';

import CONST from '../constants/CONST.js';
import { toggleAll } from '../actions';

import TodoList from '../components/TodoList.jsx';

const getVisibleTodos = (todos, visibilityFilter) => {
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

const mapStateToProps = (state) => {
    let activeTodoCount = state.todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
    }, 0);

    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter),
        activeTodoCount
    };
};

const mapDispatchToProps = (dispatch) => {
    const onToggleAll = (event) => {
        let checked = event.target.checked;
        dispatch(toggleAll(checked));
    };

    return {
        onToggleAll
    }
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;



