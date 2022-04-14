import { createSlice } from '@reduxjs/toolkit';
import { usersService } from '../services/users';

const usersSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll();
      dispatch(setUsers(users));
    } catch (e) {
      console.error(e);
    }
  };
};

export default usersSlice.reducer;
