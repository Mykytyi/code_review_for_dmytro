import { combineReducers } from "redux";
import { auth } from './auth';
import { taskList } from './taskList';

export const rootReducer = combineReducers({auth, taskList});