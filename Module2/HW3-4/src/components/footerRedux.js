'use strict';
import React from 'react';
import classNames from 'classnames';
import Utils from './utils.js';
import CONST from '../constants/CONST.js';

import ClearButton from './ClearButton.jsx';
import FilterLink from './FilterLink.jsx';

const TodoFooter = (props) => {
    let activeTodoWord = Utils.pluralize(props.count, 'item');
    let clearButtonNormalized = null;

    if (props.completedCount > 0) {
        clearButtonNormalized = ClearButton;
    }

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{props.count}</strong> {activeTodoWord} left
            </span>
            <ul className="filters">
                <li>
                    <FilterLink filter={CONST.ALL_TODOS}>
                        All
                    </FilterLink>
                </li>
                {' '}
                <li>
                    <FilterLink filter={CONST.ACTIVE_TODOS}>
                        Active
                    </FilterLink>
                </li>
                {' '}
                <li>
                    <FilterLink filter={CONST.COMPLETED_TODOS}>
                        Completed
                    </FilterLink>
                </li>
            </ul>
            {clearButtonNormalized}
        </footer>
    );

};

TodoFooter.propTypes = {
    count: React.propTypes.isRequired,
    completedCount: React.propTypes.isRequired
};

export default TodoFooter;



