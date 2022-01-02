let timeoutId;

const timeout = (f, t) => {
  timeoutId = setTimeout(f, t);
};

export const setNotification = (message, time) => {
  return async (dispatch) => {
    clearInterval(timeoutId);
    dispatch({ type: 'NOTIFICATION', data: message });
    await timeout(() => {
      dispatch({ type: 'NOTIFICATION', data: null });
    }, time * 1000);
  };
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
