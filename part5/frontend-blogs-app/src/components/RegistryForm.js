import React from 'react';

const RegistryForm = () => {
  return (
    <form className="form">
      <div className="divInput">
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" name="name" placeholder="Enter name" />
      </div>
      <div className="divInput">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter username"
        />
      </div>
      <div className="divInput">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          name="password"
          placeholder="Enter password"
        />
      </div>
      <button className="greenButton">Registry</button>
    </form>
  );
};

export { RegistryForm };
