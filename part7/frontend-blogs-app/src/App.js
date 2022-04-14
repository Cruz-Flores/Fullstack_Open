import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNotification } from './hooks/index.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { blogsService } from './services/blogs.js';

import { Notification } from './components/Notification.js';
import { Togglable } from './components/Togglable.js';
import { Blog } from './components/Blog.js';
import { RegistryForm } from './components/RegistryForm.js';
import { LoginForm } from './components/LoginForm.js';
import { Users } from './components/Users.js';
import { IndividualUser } from './components/IndividualUser.js';
import { Blogs } from './components/Blogs.js';

import { initializeBlogs } from './reducers/blogReducer';
import { setCurrentUser } from './reducers/currentUserReducer.js';
import { initializeUsers } from './reducers/usersReducer.js';

const App = () => {
  const { currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { notify } = useNotification();

  const userLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser');
    dispatch(setCurrentUser(null));
    notify(`${currentUser.name} logout`, 'succes');
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser');
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(currentUser));
      blogsService.setToken(currentUser.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const padding = {
    padding: 5,
  };

  return (
    <>
      <Notification />
      {!currentUser ? (
        <div>
          <LoginForm />
          <Togglable buttonLabel="Registry">
            <RegistryForm />
          </Togglable>
        </div>
      ) : (
        <>
          <h2>Blogs</h2>
          <p>
            {currentUser.name} logged in
            <button onClick={userLogout}>logout</button>
          </p>
        </>
      )}
      <Router>
        <div>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<IndividualUser />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
