'use strict';
import todo from './todo.js';
import ACTIONS_NAMES from '../constants/ACTIONS_NAMES.js';

const todos = (state = [], action) => {
  switch(action.type) {
      case ACTIONS_NAMES.ADD_TODO:
          return [
              ...state,
              todo(undefined, action)
          ];

      case ACTIONS_NAMES.UPDATE_TODO:
          return state.map(
              (item) => todo(item, action)
          );

      case ACTIONS_NAMES.TOGGLE_TODO:
          return state.map(
              (item) => todo(item, action)
          );

      case ACTIONS_NAMES.TOGGLE_ALL:
          return state.map(
              (item) => {
                  return Object.assign({}, item, {completed: action.checked})
              }
          );

      case ACTIONS_NAMES.CLEAR_COMPLETED:
          return state.filter((todo) => {
              return !todo.completed;
          });

      case ACTIONS_NAMES.DESTROY_TODO:
          return state.filter(function (todo) {
              return todo.id !== action.id;
          });

      default:
          return state;
  }
};

export default todos;
