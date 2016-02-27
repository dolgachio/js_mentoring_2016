'use strict';
import todo from './todo.js';

const todos = (state = [], action) => {
  switch(action.type) {
      case 'ADD_TODO':
          return [
              ...state,
              todo(undefined, action)
          ];

      case 'TOGGLE_TODO':
          return state.map(
              (item) => todo(item, action)
          );

      case 'TOGGLE_ALL':
          return state.map(
              (item) => {
                  Object.assign({}, item, {completed: action.checked})
              }
          );

      case 'DESTROY_TODO':
          return state.filter(function (todo) {
              return todo !== action.todo;
          });

      default:
          return state;
  }
};

export default todos;
