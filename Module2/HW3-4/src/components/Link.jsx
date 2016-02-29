'use strict';
import classNames from 'classnames';
import React from 'react';

const Link = ({ active, children, hash }) => {
    return (
        <a
            href={hash}
            className={classNames({selected: active})}>
            {children}
        </a>
    )
};

export default Link;