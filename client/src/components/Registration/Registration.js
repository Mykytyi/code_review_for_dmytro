import React from 'react';
import './Registration.css';
import Loading from "../animation/loading/Loading";
import ErrorContainer from "../Error/ErrorContainer";

const Registration = (props) => {
  const {
    login,
    password,
    signIn,
    updateLogin,
    updatePassword,
    isLoading,
    finishRegistration,
    startLoading,
    isError
  } = props;

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  let amountOfMSeconds = getRandomFloat(1, 2) * 1000;

  return (
    <React.Fragment>
      <div className='reg-field-wrap'>
        <button className="reg-with-google"><span className="googleIcon">Google</span>Sign in with Google</button>
        <p className="or">or</p>
        <form className="reg-form">
          <label className="regLabel">
            Login:
            <input type="text"
                   onChange={(event) => {updateLogin(event.target.value)}}
                   value={login}
                   placeholder="Login"
                   className="regInput regInputOne"/>
          </label>
          <label className="regLabel">
            Password:
            <input type="password"
                   onChange={(event) => {updatePassword(event.target.value)}}
                   value={password}
                   placeholder="Password"
                   className="regInput regInputTwo"/>
          </label>
          <button onClick={(event) => {
            event.preventDefault();
            startLoading();
            setTimeout(() => signIn(), amountOfMSeconds);
          }} className="signIn">Sign In</button>
        </form>
      </div>
      <div className="footer"><a href="#logIn" onClick={(event) => {
        event.preventDefault();
        startLoading();
        setTimeout(() => finishRegistration(), amountOfMSeconds);
      }}>Log in</a></div>
      {isLoading && <Loading />}
      {isError && <ErrorContainer />}
    </React.Fragment>
  );
};

export default Registration;