import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNotification } from './hooks/index.js';

import { blogsService } from './services/blogs.js';

import { NewBlogForm } from './components/NewBlogForm.js';
import { Notification } from './components/Notification.js';
import { Togglable } from './components/Togglable.js';
import { Blog } from './components/Blog.js';
import { RegistryForm } from './components/RegistryForm.js';
import { LoginForm } from './components/LoginForm.js';

import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer.js';

const App = () => {
  const { blogs, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { notify } = useNotification();

  const userLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser');
    dispatch(setUser(null));
    notify(`${user.name} logout`, 'succes');
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogsService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Notification />
      {!user ? (
        <div>
          <LoginForm />
          <Togglable buttonLabel="Registry">
            <RegistryForm />
          </Togglable>
        </div>
      ) : (
        <div id="mainDiv">
          <h2>Blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={userLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create">
            <NewBlogForm />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
