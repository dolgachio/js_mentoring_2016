'use strict';

import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import classNames from 'classnames';
import { connect } from 'react-redux';
import CONST from '../constants/CONST.js';
import { destroyTodo, toggleTodo, updateTodo, editTodo } from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        editing: state.editingTodo === ownProps.todo.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    let id = ownProps.todo.id;

    const destroy = () => {
        dispatch(destroyTodo(id))
    };

    const toggle = () => {
        dispatch(toggleTodo(id))
    };

    const onTitleUpdate = (title) => {
        dispatch(updateTodo({id, title}));
    };

    const startEdit = () => {
        dispatch(editTodo(id));
    };

    const stopEdit = () => {
        dispatch(editTodo(null));
    };

    return {
        destroy,
        toggle,
        onTitleUpdate,
        startEdit,
        stopEdit
    };
};

class TodoItem extends React.Component{
    handleSubmit() {
        var val = this.refs.editField.value.trim();

        if (val) {
            this.props.onTitleUpdate(val);
            this.props.stopEdit();
        } else {
            this.props.destroy();
        }
    }

    handleKeyDown(event) {
        if (event.which === CONST.ESCAPE_KEY) {
            this.refs.editField.value = this.props.todo.title;
            this.props.stopEdit();
        } else if (event.which === CONST.ENTER_KEY) {
            this.handleSubmit();
        }
    }

    shouldComponentUpdate(nextProps) {
        return (
            nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing
        );
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            this.refs.editField.focus();
        }
    }

    render() {
        const checkboxStyle = {
            position: 'absolute',
            width: '20px',
            margin: '0',
            top: '30%',
            left: '18px'
        };

        return (
            <li className={classNames({
				completed: this.props.todo.completed,
				editing: this.props.editing
			})}>
                <div className="view">
                    <Checkbox
                        className="checkbox"
                        checked={this.props.todo.completed}
                        onCheck={this.props.toggle}
                        style={checkboxStyle}
                    />
                    <label onDoubleClick={this.props.startEdit}>
                        {this.props.todo.title}
                    </label>
                    <IconButton
                        style={{position: 'absolute', right: '0', top: '5px'}}
                        primary={true}
                        onClick={this.props.destroy}><NavigationClose /></IconButton>
                </div>

                <input
                    ref="editField"
                    className="edit"
                    defaultValue={this.props.todo.title}
                    onBlur={this.handleSubmit.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                />
            </li>
        );
    }
}

const TodoItemContainer = connect(mapStateToProps, mapDispatchToProps)(TodoItem);

export default TodoItemContainer;

