'use strict';

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';


const Link = ({ active, children, hash }) => {
    return (
    <RaisedButton
        label={children}
        href={hash}
        primary={active}
        linkButton={true}
        secondary={true}
        style={{boxShadow: 'none', backgroundColor: 'none'}}/>
    )
};

export default Link;