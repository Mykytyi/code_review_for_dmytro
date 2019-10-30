import React from 'react';
import './Error.css';

const Error = (props) => {
  const {errorText, errorTitle, removeError} = props;

  return (
    <div className="error_background">
      <div className="error_field">
        <div className="blue_line">
          <p>{errorTitle}</p>
        </div>
        <p>{errorText}</p>
        <button className="error_Ok"
                onClick={() => removeError()}>OK</button>
      </div>
    </div>
  );
};

export default Error;