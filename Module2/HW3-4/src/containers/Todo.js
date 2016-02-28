'use strict';

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CONST from '../constants/CONST.js';
import actions from '../actions/actions.js';

const mapStateToProps = (state, ownProps) => {
    return {
        editing: state.editingTodo === ownProps.todo.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    let id = ownProps.todo.id;

    const destroy = () => {
        dispatch(actions.destroyTodo(id))
    };

    const toggle = () => {
        dispatch(actions.toggleTodo(id))
    };

    const onTitleUpdate = (title) => {
        dispatch(actions.updateTodo({id, title}));
    };

    const startEdit = () => {
        dispatch(actions.editTodo(id));
    };

    const stopEdit = () => {
        dispatch(actions.editTodo(null));
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
            /*this.setState({editText: this.props.todo.title});
            this.props.onCancel(event);*/
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
        return (
            <li className={classNames({
				completed: this.props.todo.completed,
				editing: this.props.editing
			})}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.props.toggle}
                    />
                    <label onDoubleClick={this.props.startEdit}>
                        {this.props.todo.title}
                    </label>
                    <button className="destroy" onClick={this.props.destroy} />
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

