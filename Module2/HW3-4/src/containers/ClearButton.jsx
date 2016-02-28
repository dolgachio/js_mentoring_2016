'use strict';
import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions/actions.js'

const ClearButon = ({completedCount, dispatch}) => {
    const onClearCompleted = () => {
        dispatch(actions.clearCompleted());
    };
    let showButton = completedCount > 0 ? '' : 'none';

    return (
        <button style={{display: showButton}}
            className="clear-completed"
            onClick={onClearCompleted}>
            Clear completed
        </button>
    );
};

const ClearButtonContainer = connect()(ClearButon);

export default ClearButtonContainer;



