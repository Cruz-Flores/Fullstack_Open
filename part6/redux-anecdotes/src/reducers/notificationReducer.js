export const notification = (message) => {
  console.log('ADD_ANECDOTE', message);
  return {
    type: 'ADD_ANECDOTE',
    message,
  };
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_ANECDOTE':
      return action.message;
    default:
      return state;
  }
};

export default notificationReducer;
