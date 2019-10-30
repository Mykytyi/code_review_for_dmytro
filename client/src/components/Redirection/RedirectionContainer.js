import { connect } from "react-redux";
import Redirection from './Redirection';

import {logIn, logOut} from '../../actions/actionCreator';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    isRegistering: state.auth.isRegistering
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch(logIn()),
    logOut: () => dispatch(logOut())
  }
};

const RedirectionContainer = connect(mapStateToProps, mapDispatchToProps)(Redirection);
export default RedirectionContainer;