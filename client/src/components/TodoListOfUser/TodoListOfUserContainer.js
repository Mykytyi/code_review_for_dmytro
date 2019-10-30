import { connect } from 'react-redux';
import TodoListOfUser from "./TodoListOfUser";

import {
  loadTasks,
  handlingLoadedTasks,
  addTaskToArr,
  showAddTaskField,
  hideAddTaskField,
  loadDataFromSessionStorage,
  logOut,
  sendTaskListToServer
} from '../../actions/actionCreator';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    articles: state.taskList.articles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTasks: () => dispatch(loadTasks()),
    handlingLoadedTasks: () => dispatch(handlingLoadedTasks()),
    addTask: () => dispatch(addTaskToArr()),
    showAddTaskField: () => dispatch(showAddTaskField()),
    hideAddTaskField: () => dispatch(hideAddTaskField()),
    loadDataFromSessionStorage: () => dispatch(loadDataFromSessionStorage()),
    logOut: () => dispatch(logOut()),
    sendTaskListToServer: () => dispatch(sendTaskListToServer())
  }
};

const TodoListOfUserContainer = connect(mapStateToProps, mapDispatchToProps)(TodoListOfUser);

export default TodoListOfUserContainer;