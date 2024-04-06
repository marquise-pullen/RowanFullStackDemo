import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import './DualForm.css';

const DualForm = ({ onLoginSuccess, onRegisterSuccess, setUsername }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="auth-container">
      <div className="welcome-back">
        <h2>Welcome Back!</h2>
        <p>To keep connected with us please login with your personal info</p>
        <button onClick={toggleView}>{isLoginView ? "Register" : "Log-in"}</button>
      </div>
      <div className="auth-form">
        {isLoginView ? (
          <LoginForm onLoginSuccess={onLoginSuccess} setUsername={setUsername} />
        ) : (
          <RegistrationForm onRegisterSuccess={onRegisterSuccess} setUsername={setUsername} />
        )}

      </div>
    </div>
  );
}

export default DualForm;
