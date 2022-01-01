const interval = (s) => {
  const ms = s * 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({ type: 'NOTIFICATION', data: message });
    await interval(time);
    dispatch({ type: 'NOTIFICATION', data: null });
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
