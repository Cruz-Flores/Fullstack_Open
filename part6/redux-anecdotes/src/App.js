import React from 'react';
import { Filter } from './components/Filter.js';
import { Notification } from './components/Notification.js';
import { AnecdoteList } from './components/AnecdoteList.js';
import { AnecdoteForm } from './components/AnecdoteForm.js';

const App = () => {
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
