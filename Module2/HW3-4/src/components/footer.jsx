'use strict';
import React from 'react';

import Badge from 'material-ui/lib/badge';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';

import CONST from '../constants/CONST.js';

import ClearButton from '../containers/ClearButton.jsx';
import FilterLink from '../containers/FilterLink.jsx';

const TodoFooter = (props) => {
    return (
        <footer className="footer">
            <Badge
                badgeContent={props.count}
                secondary={true}
                className="notification">
                <NotificationsIcon />
            </Badge>

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



