'use strict';

import React from 'react';
import director from 'director';
import CONST from '../constants/CONST.js';
import TodoFooter from './footer.jsx';
import TodoItem from './todoItem.jsx';

let Router = director.Router;
let ENTER_KEY = 13;

class TodoApp extends React.Component{
	constructor(props) {
		super(props);

		//TODO: move to store *
		this.state = {
			nowShowing: CONST.ALL_TODOS,
			editing: null,
			newTodo: ''
		};
	}


	componentDidMount() {
		//TODO: replace with dispatch events in footer component
		let setState = this.setState;
		let router = Router({
			'/': setState.bind(this, {nowShowing: CONST.ALL_TODOS}),
			'/active': setState.bind(this, {nowShowing: CONST.ACTIVE_TODOS}),
			'/completed': setState.bind(this, {nowShowing: CONST.COMPLETED_TODOS})
		});
		router.init('/');
	}

	handleChange(event) {
		//TODO: remove
		this.setState({newTodo: event.target.value});
	}

	handleNewTodoKeyDown(event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		let val = this.state.newTodo.trim();

		//TODO: dispatch event ADD_TODO *
		if (val) {
			this.props.model.addTodo(val);
			this.setState({newTodo: ''});
		}
	}

	toggleAll(event) {
		//TODO: dispatch event TOGGLE_ALL *
		let checked = event.target.checked;
		this.props.model.toggleAll(checked);
	}

	toggle(todoToToggle) {
		//TODO: dispatch event TOGGLE_TODO *
		this.props.model.toggle(todoToToggle);
	}

	destroy(todo) {
		//TODO: dispatch event DESTROY_TODO *
		this.props.model.destroy(todo);
	}

	edit(todo) {
		//TODO: dispatch event EDIT_TODO
		this.setState({editing: todo.id});
	}

	save(todoToSave, text) {
		//TODO: dispatch event SAVE_TODO
		this.props.model.save(todoToSave, text);
		this.setState({editing: null});
	}

	cancel() {
		//TODO: dispatch event CANCEL_EDIT
		this.setState({editing: null});
	}

	clearCompleted() {
		//TODO: switch to filter usage
		this.props.model.clearCompleted();
	}

	render() {
		let footer;
		let main;
		let todos = this.props.model.todos;

		let shownTodos = todos.filter(function (todo) {
			switch (this.state.nowShowing) {
			case CONST.ACTIVE_TODOS:
				return !todo.completed;
			case CONST.COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
			}
		}, this);

		let todoItems = shownTodos.map(function (todo) {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={this.toggle.bind(this, todo)}
					onDestroy={this.destroy.bind(this, todo)}
					onEdit={this.edit.bind(this, todo)}
					editing={this.state.editing === todo.id}
					onSave={this.save.bind(this, todo)}
					onCancel={this.cancel.bind(this)}
				/>
			);
		}, this);

		let activeTodoCount = todos.reduce(function (accum, todo) {
			return todo.completed ? accum : accum + 1;
		}, 0);

		let completedCount = todos.length - activeTodoCount;

		if (activeTodoCount || completedCount) {
			footer =
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted.bind(this)}
				/>;
		}

		if (todos.length) {
			main = (
				<section className="main">
					<input
						className="toggle-all"
						type="checkbox"
						onChange={this.toggleAll.bind(this)}
						checked={activeTodoCount === 0}
					/>
					<ul className="todo-list">
						{todoItems}
					</ul>
				</section>
			);
		}

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						value={this.state.newTodo}
						onKeyDown={this.handleNewTodoKeyDown.bind(this)}
						onChange={this.handleChange.bind(this)}
						autoFocus={true}
					/>
				</header>
				{main}
				{footer}
			</div>
		);
	}
}



export default TodoApp;
