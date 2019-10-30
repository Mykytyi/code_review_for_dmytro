import {ACTIONS} from '../constants.js';
import { initialState } from './initialState';

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case ACTIONS.AUTH.UPDATE_LOGIN:
      return {
        ...state,
        login: action.login
      };
    case ACTIONS.AUTH.UPDATE_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    case ACTIONS.AUTH.REQUEST_START:
      return {
        ...state,
        requesting: true
      };
    case ACTIONS.AUTH.LOG_IN:
      return {
        ...state,
        loggedIn: true,
        requesting: false,
        login: '',
        password: ''
      };
    case ACTIONS.AUTH.LOG_OUT:
      return {
        ...state,
        loggedIn: false,
        requesting: false
      };
    case ACTIONS.AUTH.START_REGISTRATION:
      return {
        ...state,
        isRegistering: true,
        isLoading: false,
        login: '',
        password: ''
      };
    case ACTIONS.AUTH.IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ACTIONS.AUTH.FINISH_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case ACTIONS.AUTH.FINISH_REGISTRATION:
      return {
        ...state,
        isRegistering: false,
        isLoading: false,
        login: '',
        password: ''
      };
    case ACTIONS.AUTH.SHOW_ERROR:
      return {
        ...state,
        isError: true,
        errorText: action.errorText,
        errorTitle: action.errorTitle
      };
    case ACTIONS.AUTH.REMOVE_ERROR:
      return {
        ...state,
        isError: false,
        errorText: ''
      };
    default:
      return state;
  }
}