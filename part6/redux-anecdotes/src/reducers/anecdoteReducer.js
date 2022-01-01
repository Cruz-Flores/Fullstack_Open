import { anecdotesService } from '../services/anecdotes';

export const vote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.put(anecdote);
    dispatch({ type: 'VOTE', data: votedAnecdote });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdotesService.createNew(content);
    dispatch({ type: 'NEW_ANECDOTE', data: newNote });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({ type: 'INIT_ANECDOTES', data: anecdotes });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'VOTE':
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.data
      );
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
