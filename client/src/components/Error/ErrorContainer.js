import { connect } from 'react-redux';
import Error from './Error';

import { removeError } from '../../actions/actionCreator';

const mapStateToProps = (state) => {
  return {
    errorText: state.auth.errorText,
    errorTitle: state.auth.errorTitle
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeError: () => dispatch(removeError())
  }
};
const ErrorContainer = connect(mapStateToProps, mapDispatchToProps)(Error);

export default ErrorContainer;