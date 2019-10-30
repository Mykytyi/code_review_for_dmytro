export const initialState = {
  auth: {
    login: '',
    password: '',
    loggedIn: false,
    isRegistering: false,
    isLoading: false,
    isError: false,
    errorTitle: '',
    errorText: ''
  },
  taskList: {
    articles: [],
    inputText: '',
    inputTitle: '',
    loading: false,
    userId: null,
    addTaskField: false
  }
};