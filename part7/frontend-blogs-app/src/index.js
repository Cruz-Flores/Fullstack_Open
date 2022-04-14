import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import blogReducer from './reducers/blogReducer';
import currentUserReducer from './reducers/currentUserReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    currentUser: currentUserReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
