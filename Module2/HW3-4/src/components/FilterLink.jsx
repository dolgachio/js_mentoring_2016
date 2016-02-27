'use strict';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import CONST from '../constants/CONST.js';
import actions from '../actions/actions.js'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter,
        children: ownProps.children
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFilterChange: () => {
            dispatch(actions.setVisibilityFilter(ownProps.filter))
        }
    }
};

const FilterLink = ({onFilterChange, active}) => {
    return (
        <a
            href="#"
            className={classNames({selected: active})}
            onClick={onFilterChange}>
            {props.children}
        </a>
    )
};

const FilterLinkContainer = connect(mapStateToProps, mapDispatchToProps)(FilterLink);

FilterLinkContainer.propTypes = {
    filter: React.propTypes.isRequired,
    children: React.propTypes.isRequired
};

export default FilterLinkContainer;



