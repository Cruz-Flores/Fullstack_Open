import React, { useEffect } from 'react';
import { Filter } from './components/Filter.js';
import { Notification } from './components/Notification.js';
import { AnecdoteList } from './components/AnecdoteList.js';
import { AnecdoteForm } from './components/AnecdoteForm.js';
import { useDispatch } from 'react-redux';
import { anecdotesService } from './services/anecdotes.js';
import { initializeAnecdotes } from './reducers/anecdoteReducer.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
