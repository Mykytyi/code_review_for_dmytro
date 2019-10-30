import React, {Component} from 'react';
import UserTaskContainer from '../UserTask/UserTaskContainer';

import './TodoListOfUser.css';
import {sendTaskListToServer} from "../../actions/actionCreator";

class TodoListOfUser extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (sessionStorage.getItem('arrayOfTasks')) {
      this.props.loadDataFromSessionStorage();
    } else {
      this.props.loadTasks();
    }

    window.addEventListener('beforeunload', (event) => {
      this.props.sendTaskListToServer();
      event.returnValue = "Are you sure you want to live the page?";
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.handlingLoadedTasks();
  }

  render() {
    const today = new Date();
    let weekDay = null;
    let month = null;
    let monthDay = today.getDate();
    let articles  = this.props.articles;
    switch (today.getDay()) {
      case 0:
        weekDay =  'Sunday';
        break;
      case 1:
        weekDay =  'Monday';
        break;
      case 2:
        weekDay =  'Tuesday';
        break;
      case 3:
        weekDay =  'Wednesday';
        break;
      case 4:
        weekDay =  'Thursday';
        break;
      case 5:
        weekDay =  'Friday';
        break;
      case 6:
        weekDay =  'Saturday';
        break;
    }
    switch (today.getMonth() + 1){
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
    }

    return (
      <React.Fragment>
        <div className="navLine">
          <div className="todoWrap">
            <header className="mainHeader">
              <button onClick={(event) => {
                event.preventDefault();
                this.props.sendTaskListToServer();
                this.props.logOut();
              }}>Log Out</button>
              <div className="wrapForTitle">
                <h2>My Day</h2>
                <p>{weekDay}, {month} {monthDay}</p>
              </div>
            </header>
            <main className="mainTasks">
              <ul className="listOfTasks">
                {articles && articles.map((elem, id)=>{
                  return (
                    <UserTaskContainer key={elem.task_id} title={elem.title} task={elem.main_text} isImportant={elem.is_favorite} isFinished={elem.is_done}/>
                  )
                })}
                <li className="listItem listItemAdd">
                  <span onClick={() => this.props.showAddTaskField()}><div className="wrapForPlus">Add</div></span>
                  <p className="addTaskText" onClick={() => this.props.showAddTaskField()}>Add a task</p>
                </li>
              </ul>
              <div className="wrapForAddingTask disabled">
                <div className="addingTaskField">
                  <form className="addingTaskForm">
                    <input
                      type="text"
                      placeholder="Add title"
                      className="inputTaskAndTitle"
                    />
                    <input
                      type="text"
                      placeholder="Add task"
                      className="inputTaskAndTitle"
                    />
                    <div className="fieldWithButtons">
                      <button onClick={(event) => {
                        event.preventDefault();
                        this.props.addTask();
                      }}>Add task</button>
                      <button onClick={(event) => {
                        event.preventDefault();
                        this.props.hideAddTaskField();
                      }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TodoListOfUser;