export const ACTIONS = {
  AUTH: {
    UPDATE_PASSWORD: 'update_password',
    UPDATE_LOGIN: 'update_login',
    LOG_IN: 'log_in',
    LOG_OUT: 'log_out',
    REQUEST_START: 'request_start',
    START_REGISTRATION: 'start_registration',
    FINISH_REGISTRATION: 'finish_registration',
    REQUEST_FOR_SIGN_IN: 'request_for_sign_in',
    REQUEST_FOR_SIGN_IN_END: 'request_for_sign_in_end',
    IS_LOADING: 'is_loading',
    FINISH_LOADING: 'finish_loading',
    SHOW_ERROR: 'show_error',
    REMOVE_ERROR: 'remove_error'
  },
  LOGGED_USER: {
    FINISH_LOAD_TASKS: 'finish_load_tasks',
    HANDLING_LOADED_TASKS: 'handling_loaded_tasks',
    ADD_TASK: 'add_task',
    DELETE_TASK_FROM_STATE: 'delete_task_from_state',
    SHOW_ADD_TASK_FIELD: 'show_add_task_field',
    HIDE_ADD_TASK_FIELD: 'hide_add_task_field',
    MARK_AS_DONE: 'mark_as_done',
    MARK_AS_IMPORTANT: 'mark_as_important',
    LOAD_DATA_FROM_SESS_STOR: 'load_data_from_sess_stor',
    SEND_TASK_LIST: 'send_task_list'
  }
};