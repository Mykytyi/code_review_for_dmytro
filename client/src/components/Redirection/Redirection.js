import React, {Component} from 'react';
import AuthorizationContainer from '../Authorization/AuthorizationContainer';
import RegistrationContainer from '../Registration/RegistrationContainer';
import TodoListOfUserContainer from '../TodoListOfUser/TodoListOfUserContainer';

class Redirection extends Component {

  componentDidMount() {
    const {logIn, logOut} = this.props;
    if (sessionStorage.getItem('login')) {
      logIn();
    } else {
      logOut();
    }
  }

  render() {
    const { isLoggedIn, isRegistering} = this.props;

    return (
      isLoggedIn
        ? <TodoListOfUserContainer />
        : isRegistering
        ? <RegistrationContainer />
        : <AuthorizationContainer />
    );
  }
}

export default Redirection;
