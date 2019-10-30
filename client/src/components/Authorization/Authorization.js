import React from 'react';
import './Authorization.css';
import Loading from '../animation/loading/Loading';
import ErrorContainer from '../Error/ErrorContainer';

const Authorization = (props) => {
  const {
    updateLogin,
    updatePassword,
    login, password,
    isLoading,
    startLoading,
    isError,
    logInRequest,
    startRegistration
  } = props;

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  let amountOfMSeconds = getRandomFloat(1, 3) * 1000;

  return (
    <React.Fragment>
      <div className="wrapForAnim">
        <div className='wrapWithDataFromServer'>
          <p>Use one of them to log in:</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Login:</th>
                <th>Password:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>admin</td>
                <td>admin</td>
              </tr>
              <tr>
                <td>2.</td>
                <td>user</td>
                <td>1234</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="auth-field-wrap">
          <button className="auth-with-google"><span className="googleIcon">Google</span>Log in with Google</button>
          <p className="or">or</p>
          <form className="auth-form">
            <label className="authLabel">
              Login:
              <input type="text"
                     onChange={(event) => updateLogin(event.target.value)}
                     value={login}
                     placeholder="Login"
                     className="authInput authInputOne"/>
            </label>
            <label className="authLabel">
              Password:
              <input type="password"
                     onChange={(event) => updatePassword(event.target.value)}
                     value={password}
                     placeholder="Password"
                     className="authInput authInputTwo"/>
            </label>
            <button onClick={(event) => {
              event.preventDefault();
              startLoading();
              setTimeout(() => {logInRequest()}, amountOfMSeconds);
            }}
            className="logIn">Log in</button>
          </form>
        </div>
        <div className="footer">
          <p>No account? <a href="#creatingAccount" onClick={(event) => {
            event.preventDefault();
            startLoading();
            setTimeout(() => {return startRegistration()}, 2000);
          }}>Create new</a></p>
        </div>
      </div>
      {isLoading && <Loading />}
      {isError && <ErrorContainer />}
    </React.Fragment>
  );
};

export default Authorization;
