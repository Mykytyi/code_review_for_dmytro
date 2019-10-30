import React, {Component} from 'react';
import './UserTask.css';

class UserTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      task: this.props.task,
      isImportant: this.props.isImportant,
      isFinished: this.props.isFinished
    };
  }

  componentDidMount() {
  }

  render() {
    const {
      deleteTaskFromState,
      markAsImportant,
      markAsDone
    } = this.props;
    return (
      <li className="listItem">
        <span className="buttonsFields markAsDone" onClick={(event) => markAsDone(event)}>Mark as done</span>
        <div className="wrapForTaskAndTitle">
          <p className="task">{this.state.task}</p>
          <p className="title">{this.state.title}</p>
        </div>
        <span className="buttonsFields delete" onClick={(event) => deleteTaskFromState(event)}>Delete</span>
        <span className="buttonsFields markAsFavoriteNotClicked" onClick={(event) => markAsImportant(event)}>Mark as favorite</span>
      </li>
    );
  }
}


export default UserTask;