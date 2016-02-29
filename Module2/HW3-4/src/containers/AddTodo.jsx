'use strict';
import React from 'react';
import { connect } from 'react-redux';

import CONST from '../constants/CONST.js';
import { addTodo } from '../actions';
import Utils from '../utils';

const mapDispatchToProps = (dispatch) => {
    const handleNewTodoKeyDown = (value) => {
        if (value) {
            let todo = {
                id: Utils.uuid(),
                title: value
            };

            dispatch(addTodo(todo));
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
            <input
                className="new-todo"
                type="text"
                placeholder="What needs to be done?"
                ref={(node) => {addTodoInput = node}}

                onKeyDown={(e) => {
                    let val;
                    if (e.keyCode !== CONST.ENTER_KEY) {
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



