import React, { useEffect } from 'react';
import Filter from './components/Filter.js';
import { Notification } from './components/Notification.js';
import { ConnectedAnecdoteList } from './components/AnecdoteList.js';
import AnecdoteForm from './components/AnecdoteForm.js';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <ConnectedAnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
