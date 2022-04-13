import { createSlice } from '@reduxjs/toolkit';
import { loginService } from '../services/login';
import { blogsService } from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = (userToLogin) => {
  return async (dispatch) => {
    try {
      const user = await loginService.loginBlogs(userToLogin);
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      dispatch(setUser(user));
    } catch (e) {
      console.error(e);
    }
  };
};

export default userSlice.reducer;
