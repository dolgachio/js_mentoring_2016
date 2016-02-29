'use strict';
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';

import { clearCompleted } from '../actions';

const ClearButon = ({completedCount, dispatch}) => {
    const onClearCompleted = () => {
        dispatch(clearCompleted());
    };
    let showButton = completedCount > 0 ? '' : 'none';

    return (
        <RaisedButton style={{display: showButton, float: 'right', marginTop:'2px'}}
            label="Clear completed"
            onClick={onClearCompleted} />
    );
};

const ClearButtonContainer = connect()(ClearButon);

export default ClearButtonContainer;



