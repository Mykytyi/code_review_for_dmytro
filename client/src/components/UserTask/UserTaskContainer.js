import { connect } from "react-redux";

import UserTask from './UserTask';
import {deleteTaskFromState, markAsDone, markAsImportant} from "../../actions/actionCreator";

const mapStateToProps = () => {

};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTaskFromState: (event) => dispatch(deleteTaskFromState(event)),
    markAsImportant: (event) => dispatch(markAsImportant(event)),
    markAsDone: (event) => dispatch(markAsDone(event))
  }
};

const UserTaskContainer = connect(mapStateToProps, mapDispatchToProps)(UserTask);

export default UserTaskContainer;