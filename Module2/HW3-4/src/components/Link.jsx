'use strict';
import classNames from 'classnames';
import React from 'react';

const Link = ({onFilterChange, active, children}) => {
    return (
        <a
            href="#"
            className={classNames({selected: active})}
            onClick={onFilterChange}>
            {children}
        </a>
    )
};

export default Link;