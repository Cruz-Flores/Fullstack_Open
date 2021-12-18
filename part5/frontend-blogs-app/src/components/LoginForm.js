import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, onChange, userToLogin }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
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
      <div>
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
      <div>
        <button id="login-button" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { LoginForm };
