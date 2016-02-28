'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { clearCompleted } from '../actions';

const ClearButon = ({completedCount, dispatch}) => {
    const onClearCompleted = () => {
        dispatch(clearCompleted());
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



