import React, { useState } from 'react';
import { useField } from '../hooks/index.js';
import { registryService } from '../services/registry.js';
import { loginService } from '../services/login.js';

const RegistryForm = ({ createNewUser /* login */ }) => {
  const [name, resetName] = useField('text', 'name');
  const [username, resetUsername] = useField('text', 'username');
  const [password, resetPassword] = useField('text', 'password');

  const addNewUser = async (event) => {
    event.preventDefault();

    console.log(
      'name.value, username.value, password.value',
      name.value,
      username.value,
      password.value
    );

    resetName();
    resetUsername();
    resetPassword();
  };

  return (
    <form onSubmit={addNewUser}>
      <div>
        <label htmlFor="name">Name:</label>
        <input {...name} />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input {...username} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input {...password} />
      </div>
      <button>Registry</button>
    </form>
  );
};

export { RegistryForm };

// const createNewUser = async (newUser) => {
//   try {
//     await registryService.userRegistry(newUser);
//     const user = await loginService.loginBlogs({
//       username: newUser.username,
//       password: newUser.password,
//     });
//     window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user));
//     blogsService.setToken(user.token);
//     setUserLoged(user);
//     setUserToLogin({
//       username: '',
//       password: '',
//     });
//     notifyWith(`${user.name}, registry succesfuly`, 'succes');
//   } catch (exception) {
//     notifyWith('Wrong credentials', 'error');
//   }
// };
