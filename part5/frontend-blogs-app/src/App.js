import React, { useState, useEffect } from 'react';
import { blogsService } from './services/blogs.js';
import { loginService } from './services/login.js';
import { NewBlogForm } from './components/NewBlogForm.js';
import { Notification } from './components/Notification.js';
import { Togglable } from './components/Togglable.js';
import { Blog } from './components/Blog.js';
import { RegistryForm } from './components/RegistryForm.js';
import { LoginForm } from './components/LoginForm.js';

import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userToLogin, setUserToLogin] = useState({
    username: '',
    password: '',
  });
  const [userLoged, setUserLoged] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (event) => {
    setUserToLogin({
      ...userToLogin,
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
      notifyWith('Wrong credentials', 'error');
    }
  };

  const userLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser');
    setUserLoged(null);
    notifyWith(`${userLoged.name} logout`, 'succes');
  };

  const addBLog = async (blogObject) => {
    try {
      const returnedBlog = await blogsService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      notifyWith(
        `A new Blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'succes'
      );
    } catch (exception) {
      notifyWith('Error', 'error');
    }
  };

  const addLikes = async (blogObject) => {
    const changedBlog = { ...blogObject, likes: blogObject.likes + 1 };
    try {
      const returnedBlog = await blogsService.update(
        blogObject.id,
        changedBlog
      );
      setBlogs(
        blogs.map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog))
      );
    } catch (exception) {
      notifyWith('Error', 'error');
    }
  };

  const deleteBlog = async (blog) => {
    const ok = window.confirm(`Delete the blog ${blog.title}`);
    if (ok) {
      await blogsService.remove(blog.id);
      setBlogs(blogs.filter((object) => object.id !== blog.id));
      notifyWith(`Deleted ${blog.title}`, 'succes');
    }
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
    <>
      <Notification notification={notification} />
      {!userLoged ? (
        <div className="formDiv">
          <LoginForm
            onSubmit={userLogin}
            userToLogin={userToLogin}
            onChange={handleInputChange}
          />
          <Togglable buttonLabel="Registry">
            <RegistryForm />
          </Togglable>
        </div>
      ) : (
        <div id="mainDiv">
          <h2>Blogs</h2>
          <p>
            {userLoged.name} logged in
            <button className="redButton" onClick={userLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="create">
            <NewBlogForm createBlog={addBLog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              userLoged={userLoged}
              addLikes={() => addLikes(blog)}
              deleteBlog={() => deleteBlog(blog)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
