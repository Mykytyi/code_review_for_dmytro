import { connect } from 'react-redux';
import {
  updateLogin,
  updatePassword,
  logInRequest,
  startRegistration,
  startLoading,
  removeError
} from '../../actions/actionCreator';
import Authorization from './Authorization';

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    password: state.auth.password,
    isLoading: state.auth.isLoading,
    isError: state.auth.isError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLogin: (login) => dispatch(updateLogin(login)),
    updatePassword: (password) => dispatch(updatePassword(password)),
    logInRequest: () => dispatch(logInRequest()),
    startRegistration: () => dispatch(startRegistration()),
    startLoading: () => dispatch(startLoading()),
    removeError: () => dispatch(removeError())
  };
};

const AuthorizationContainer = connect(mapStateToProps, mapDispatchToProps)(Authorization);

export default AuthorizationContainer;