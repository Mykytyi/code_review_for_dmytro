import { connect } from 'react-redux';
import Registration from './Registration';

import {updatePassword, updateLogin, signIn, finishRegistration, startLoading} from '../../actions/actionCreator';

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    password: state.auth.password,
    reqForSignIn: state.auth.reqForSignIn,
    showError: state.auth.showError,
    isRegistering: state.auth.isRegistering,
    isLoading: state.auth.isLoading,
    isError: state.auth.isError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => {dispatch(signIn())},
    updateLogin: (login) => {dispatch(updateLogin(login))},
    updatePassword: (password) => {dispatch(updatePassword(password))},
    finishRegistration: () => {dispatch(finishRegistration())},
    startLoading: () => {dispatch(startLoading())}
  }
};

const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration);

export default RegistrationContainer;