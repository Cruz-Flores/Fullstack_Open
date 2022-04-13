import { createSlice } from '@reduxjs/toolkit';
import { blogsService } from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return [...state, { ...action.payload }];
    },
    addBlogWithOneMoreLike(state, action) {
      const blogWithOneMoreLike = action.payload;
      return state.map((b) =>
        b.id !== blogWithOneMoreLike.id ? b : blogWithOneMoreLike
      );
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
  },
});

const { addBlog, addBlogWithOneMoreLike, setBlogs, removeBlog } =
  blogSlice.actions;

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    dispatch(addBlog(newBlog));
  };
};

export const addLike = (blog) => {
  return async (dispatch) => {
    const blogWithOneMoreLike = await blogsService.update(blog);
    dispatch(addBlogWithOneMoreLike(blogWithOneMoreLike));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogsService.remove(id);
    } catch (e) {
      console.error(e);
    }
    dispatch(removeBlog(id));
  };
};

export default blogSlice.reducer;
