import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer.js';
import { setNotification } from '../reducers/notificationReducer.js';

const AnecdoteList = (props) => {
  const voteAnecdote = (anecdote) => {
    props.vote(anecdote);
    props.setNotification(`you voted ${anecdote.content}`, 2);
  };

  return (
    <>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  if (state.filter.length === 0) {
    return { anecdotes: state.anecdotes };
  }
  return {
    anecdotes: state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
  };
};

const mapDispatchToProps = {
  vote,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export { ConnectedAnecdoteList };
