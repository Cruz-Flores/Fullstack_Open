import { createSlice } from '@reduxjs/toolkit';
import { loginService } from '../services/login';
import { blogsService } from '../services/blogs';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    setCurrentUser(state, action) {
      return action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export const initializeCurrentUser = (userToLogin) => {
  return async (dispatch) => {
    try {
      const user = await loginService.loginBlogs(userToLogin);
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      dispatch(setCurrentUser(user));
    } catch (e) {
      console.error(e);
    }
  };
};

export default currentUserSlice.reducer;
