'use strict';
import React from 'react';
import { connect } from 'react-redux';

import CONST from '../constants/CONST.js';
import actions from '../actions/actions.js'

const ClearButon = ({dispatch}) => {
    const onClearCompleted = () => {
        dispatch(actions.clearCompleted());
    };

    return (
        <button
            className="clear-completed"
            onClick={onClearCompleted}>
            Clear completed
        </button>
    );
};

const ClearButtonContainer = connect()(ClearButon);

export default ClearButtonContainer;



