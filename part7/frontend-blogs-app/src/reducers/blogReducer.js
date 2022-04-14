import { createSlice } from '@reduxjs/toolkit';
import { blogsService } from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return [...state, { ...action.payload }];
    },
    addUpdatedBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
  },
});

const { addBlog, addUpdatedBlog, setBlogs, removeBlog } = blogSlice.actions;

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    dispatch(addBlog(newBlog));
  };
};

export const addLike = (blog) => {
  return async (dispatch) => {
    const blogWithOneMoreLike = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogsService.update(blogWithOneMoreLike);
    dispatch(addUpdatedBlog(updatedBlog));
  };
};

export const addComment = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.update(blog);
    dispatch(addUpdatedBlog(updatedBlog));
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
