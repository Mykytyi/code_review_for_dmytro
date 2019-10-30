import React from 'react';
import './App.css';
import {rootReducer} from './reducers/index';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";

import Todo from './containers/todo/Todo';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

export default App;
