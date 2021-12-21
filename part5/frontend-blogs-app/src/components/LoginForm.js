import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, onChange, userToLogin }) => {
  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <div className="divInput">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter username"
          value={userToLogin.username}
          onChange={onChange}
        />
      </div>
      <div className="divInput">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          name="password"
          placeholder="Enter password"
          value={userToLogin.password}
          onChange={onChange}
        />
      </div>
      <button id="logFormButton" type="submit">
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { LoginForm };
