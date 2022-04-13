import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
