import {ACTIONS} from "../constants";

export const startRegistration = () => ({
  type: ACTIONS.AUTH.START_REGISTRATION
});

export const finishRegistration = () => ({
  type: ACTIONS.AUTH.FINISH_REGISTRATION
});

export const updatePassword = (password) => ({
  type: ACTIONS.AUTH.UPDATE_PASSWORD,
  password
});

export const updateLogin = (login) => ({
  type: ACTIONS.AUTH.UPDATE_LOGIN,
  login
});

export const logIn = () => ({
  type: ACTIONS.AUTH.LOG_IN
});

export const logOut = () => {
  sessionStorage.clear();
  return {
    type: ACTIONS.AUTH.LOG_OUT
  }
};

export const logInRequest = () => {
  return (dispatch, getState) => {
    const { auth: {login, password} } = getState();
    if (login.length > 0 && password.length > 0){

      const promise = fetch('https://test-nikita-cherevatyi-planner.herokuapp.com/api/login', {
        method: 'POST',
        body: JSON.stringify({
          login: `${login}`,
          password: `${password}`
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      promise
        .then(response => {
          const statusCode = response.status;
          switch (statusCode) {
            case 200:
              dispatch(finishLoading());
              dispatch(logIn());
              return response.text();
            case 401:
              dispatch(finishLoading());
              dispatch(logOut());
              dispatch(showError('This user does not exist or you entered incorrect password. You are able to register a new user.'));
              break;
            default:
              dispatch(finishLoading());
              break;
          }
        })
        .then((response) => {
          if (response) {
            let array = JSON.parse(response);
            let userID = array[1];
            let login = array[0];
            sessionStorage.setItem('login', `${login}`);
            sessionStorage.setItem('userId', `${userID}`);
          }
        })
        .catch(err => {
          dispatch(finishLoading());
          dispatch(showError(`${err}`));
        });
    } else {
      dispatch(finishLoading());
      dispatch(showError('Input some symbols'));
    }
  }
};

const showError = (text=`Error`, errorTitle='Error') => {
  return {
    type: ACTIONS.AUTH.SHOW_ERROR,
    isError: true,
    errorText: text,
    errorTitle: errorTitle
  }
};

export const removeError = () => {
  return {
    type: ACTIONS.AUTH.REMOVE_ERROR,
    isError: false,
    errorText: ''
  }
};

export const startLoading = () => {
  return {
    type: ACTIONS.AUTH.IS_LOADING
  }
};

const finishLoading = () => {
  return {
    type: ACTIONS.AUTH.FINISH_LOADING
  }
};

export const signIn = () => {
  return (dispatch, getState) => {
    const { auth: {login,password} } = getState();
    const promise = fetch('https://test-nikita-cherevatyi-planner.herokuapp.com/api/signIn', {
      method: 'POST',
      body: JSON.stringify({
        login: `${login}`,
        password: `${password}`
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    promise
      .then(response => {
        const responseStatus = response.status;
        switch (responseStatus){
          case 403:
            dispatch(finishLoading());
            dispatch(showError('This user is already exist. Try another Login!'));
            break;
          case 201:
            dispatch(showError('User has registered! You can log in.', 'Success'));
            dispatch(finishRegistration());
            break;
          default:
            dispatch(finishLoading());
            dispatch(showError('Try one more time'));
            break;
        }
      })
      .catch(err => {
        dispatch(finishLoading());
        dispatch(showError(`${err}`));
      })
  }
};

// ````````````````````````````Actions for user's task list````````````````````````````````````//

export const loadTasks = () => {
  return (dispatch) => {
    const promise = fetch('https://test-nikita-cherevatyi-planner.herokuapp.com/api/login/userTaskList', {
      method: 'GET',
      credentials: 'same-origin',
      withCredentials: true
    });
    promise
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        dispatch(finishLoadTasks(JSON.parse(response)));
      });
  }
};

export const loadDataFromSessionStorage = () => {
  return (dispatch) => {
    let articles = JSON.parse(sessionStorage.getItem('arrayOfTasks'));
    articles.sort((elem1, elem2) => {
      return elem2.is_favorite - elem1.is_favorite;
    });
    dispatch(finishLoadTasks(articles));
  }
};

export const handlingLoadedTasks = () => {
  return (dispatch, getState) => {
    let listItemsST = getState().taskList.articles;
    let listItemsBR = document.body.getElementsByClassName('listItem');
    if (listItemsST.length > 0 && listItemsBR.length > 1) {
      listItemsST.forEach((item, i) => {
        listItemsBR[i].positonInStateArray = i;
        //Расставляем звезды рядом с задачями при первой загрузке данных с сервера
        if (item.is_favorite) {
          listItemsBR[i].lastChild.classList.remove('markAsFavoriteNotClicked');
          listItemsBR[i].lastChild.classList.add('markAsFavoriteClicked');
        } else {
          listItemsBR[i].lastChild.classList.remove('markAsFavoriteClicked');
          listItemsBR[i].lastChild.classList.add('markAsFavoriteNotClicked');
        }
        //Помечаем выполненные задачи
        if (item.is_done) {
          listItemsBR[i].firstChild.classList.add('clicked');
          listItemsBR[i].childNodes[1].classList.add('finished');
        } else {
          listItemsBR[i].firstChild.classList.remove('clicked');
          listItemsBR[i].childNodes[1].classList.remove('finished');
        }
      });
    }
  }
};

const finishLoadTasks = (articles) => {
  let userId = sessionStorage.getItem('userId');
  sessionStorage.setItem(`arrayOfTasks`, `${JSON.stringify(articles)}`);
  return {
    type: ACTIONS.LOGGED_USER.FINISH_LOAD_TASKS,
    articles,
    userId
  }
};

export const markAsDone = (event) => {
  return (dispatch, getState) => {
    let newStateForPush = getState().taskList.articles.concat();
    let taskPosForMark = event.currentTarget.parentNode.positonInStateArray;
    (newStateForPush[taskPosForMark].is_done) ? newStateForPush[taskPosForMark].is_done = false : newStateForPush[taskPosForMark].is_done = true;
    //Deleting task from session storage

    dispatch(finishLoadTasks(newStateForPush));
  }
};

export const markAsImportant = (event) => {
  return (dispatch, getState) => {
    let newStateForPush = getState().taskList.articles.concat();
    let taskPosForMark = event.currentTarget.parentNode.positonInStateArray;
    (newStateForPush[taskPosForMark].is_favorite) ? newStateForPush[taskPosForMark].is_favorite = false : newStateForPush[taskPosForMark].is_favorite = true;
    //Making task important in sessStore

    dispatch(finishLoadTasks(newStateForPush));
  }
};

export const showAddTaskField = () => {
  let addTaskField = document.body.getElementsByClassName('wrapForAddingTask')[0];
  addTaskField.classList.remove('disabled');
  return {
    type: ACTIONS.LOGGED_USER.SHOW_ADD_TASK_FIELD
  }
};

export const hideAddTaskField = () => {
  let addTaskField = document.body.getElementsByClassName('wrapForAddingTask')[0];
  addTaskField.classList.add('disabled');
  return {
    type: ACTIONS.LOGGED_USER.HIDE_ADD_TASK_FIELD
  }
};

export const deleteTaskFromState = (event) => {
  return (dispatch, getState) => {
    let newStateForPush = getState().taskList.articles.concat();
    let taskPosForDel = event.currentTarget.parentNode.positonInStateArray;
    newStateForPush = newStateForPush.filter((elem, id) => {
      return id !== taskPosForDel;
    });
    dispatch(finishLoadTasks(newStateForPush));
  }
};

export const addTaskToArr = () => {
  return (dispatch, getState) => {
    //Список задач, в которые мы добавим новую
    let newArticles = getState().taskList.articles.concat();
    //Инпуты, в которых лежат task&title
    const taskAndTitle = document.getElementsByClassName('inputTaskAndTitle');
    //Новый объект с задачей
    let newTaskForPush = {
      user_id: getState().taskList.userId,
      task_id: newArticles.length + 1,
      title: taskAndTitle[0].value,
      main_text: taskAndTitle[1].value,
      is_done: false,
      is_favorite: false
    };
    //Adding new item into session storage
    let newArrayForSessStor = JSON.parse(sessionStorage.getItem('arrayOfTasks'));
    sessionStorage.removeItem('arrayOfTasks');
    newArrayForSessStor.push(newTaskForPush);
    sessionStorage.setItem('arrayOfTasks', JSON.stringify(newArrayForSessStor));
    newArticles.push(newTaskForPush);
    //Clearing inputs
    taskAndTitle[0].value = '';
    taskAndTitle[1].value = '';

    dispatch(addTask(newArticles));
    dispatch(hideAddTaskField());
  }
};

const addTask = (newArticles) => {
  return {
    type: ACTIONS.LOGGED_USER.ADD_TASK,
    articles: newArticles
  }
};

export const sendTaskListToServer = () => {
  let strArr = sessionStorage.getItem('arrayOfTasks');
  const promise = fetch('https://test-nikita-cherevatyi-planner.herokuapp.com/api/login/sendTaskList', {
    method: 'POST',
    body: JSON.stringify({
      taskList: strArr,
      userId: `${sessionStorage.getItem('userId')}`
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  });
  promise
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err;
    });
  return {
    type: ACTIONS.LOGGED_USER.SEND_TASK_LIST
  }
};
