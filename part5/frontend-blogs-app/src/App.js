import React, { useState, useEffect } from 'react';
import blogsService from './services/blogs.js';
import { loginService } from './services/login.js';
import { LoginForm } from './components/LoginForm.js';
import { BlogList } from './components/BlogList.js';
import { NewBlogForm } from './components/NewBlogForm.js';
import { Notification } from './components/Notification.js';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userToLogin, setUserToLogin] = useState({
    username: '',
    password: '',
  });
  const [userLoged, setUserLoged] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const [notification, setNotification] = useState(null);

  const handleInputChange = (event) => {
    setUserToLogin({
      ...userToLogin,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    });
  };

  const notifyWith = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const userLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.loginBlogs({
        ...userToLogin,
      });
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      setUserLoged(user);
      setUserToLogin({
        username: '',
        password: '',
      });
      notifyWith(`${user.name} logged`, 'succes');
    } catch (exception) {
      notifyWith(`Wrong credentials`, 'error');
    }
    console.log(userToLogin);
  };

  const userLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser');
    setUserLoged(null);
    notifyWith(`${userLoged.name} logout`, 'succes');
  };

  const addBLog = async (event) => {
    event.preventDefault();
    const blogObject = {
      ...newBlog,
    };

    const returnedBlog = await blogsService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
    notifyWith(
      `A new Blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      'succes'
    );
  };

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserLoged(user);
      blogsService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      {!userLoged ? (
        <LoginForm
          onSubmit={userLogin}
          userToLogin={userToLogin}
          onChange={handleInputChange}
        />
      ) : (
        <>
          <h2>Blogs</h2>
          <p>
            {userLoged.name} logged in
            <button onClick={userLogout}>logout</button>
          </p>
          <NewBlogForm
            newBlog={newBlog}
            onSubmit={addBLog}
            onChange={handleNewBlogChange}
          />
          <BlogList user={userLoged.name} blogs={blogs} onClick={userLogout} />
        </>
      )}
    </div>
  );
};

export default App;
