import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    configNotification(state, action) {
      return action.payload;
    },
    deleteNotification(state, action) {
      return null;
    },
  },
});

export const { configNotification, deleteNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
