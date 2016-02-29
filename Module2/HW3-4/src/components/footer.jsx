'use strict';
import React from 'react';

import Utils from '../utils';
import CONST from '../constants/CONST.js';

import ClearButton from '../containers/ClearButton.jsx';
import FilterLink from '../containers/FilterLink.jsx';

const TodoFooter = (props) => {
    let activeTodoWord = Utils.pluralize(props.count, 'item');

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{props.count}</strong> {activeTodoWord} left
            </span>
            <ul className="filters">
                <li>
                    <FilterLink
                        hash="#/"
                        filter={CONST.ALL_TODOS}>
                        All
                    </FilterLink>
                </li>
                {' '}
                <li>
                    <FilterLink
                        hash="#/active"
                        filter={CONST.ACTIVE_TODOS}>
                        Active
                    </FilterLink>
                </li>
                {' '}
                <li>
                    <FilterLink
                        hash="#/completed"
                        filter={CONST.COMPLETED_TODOS}>
                        Completed
                    </FilterLink>
                </li>
            </ul>
            <ClearButton completedCount={props.completedCount}/>
        </footer>
    );

};

export default TodoFooter;



