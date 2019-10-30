import {ACTIONS} from '../constants.js';
import { initialState } from './initialState';

export function taskList(state = initialState.taskList, action) {
  switch (action.type) {
    case ACTIONS.LOGGED_USER.FINISH_LOAD_TASKS:
      return {
        ...state,
        articles: action.articles,
        userId: action.userId
      };
    case ACTIONS.LOGGED_USER.ADD_TASK:
      return {
        ...state,
        articles: action.articles
      };
    case ACTIONS.LOGGED_USER.SEND_TASK_LIST:
      return {
        ...state
      };
    default:
      return {
        ...state
      }
  }
}