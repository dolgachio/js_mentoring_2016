'use strict';
import React from 'react';
import connect from 'react-redux';

import CONST from '../constants/CONST.js';
import actions from '../actions/actions.js';
import Utils from './utils.js';

const mapDispatchToProps = (dispatch) => {
    const handleNewTodoKeyDown = (value) => {
        if (value) {
            let todo = {
                id: Utils.uuid(),
                title: value
            };

            dispatch(actions.addTodo(todo));
        }
    };

    return {
        handleNewTodoKeyDown
    }
};

const AddTodo = ({handleNewTodoKeyDown}) => {
    let addTodoInput = {value: ''};

    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                ref={(node) => {addTodoInput = node}}
                onKeyDown={(e) => {
                    let val;
                    if (e.keyCode !== ENTER_KEY) {
                        return;
                    }

                    e.preventDefault();
                    val = addTodoInput.value.trim();
                    handleNewTodoKeyDown(val);
                    addTodoInput.value = '';
                }}
                autoFocus={true}
            />
        </header>
    );
};


const AddTodoContainer = connect(null, mapDispatchToProps)(AddTodo);

export default AddTodoContainer;



