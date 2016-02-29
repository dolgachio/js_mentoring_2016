'use strict';

import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import TodoApp from '../components/TodoApp.jsx';

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

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterChange: (filter) => {
            dispatch(setVisibilityFilter(filter))
        }
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

export default AppContainer;
