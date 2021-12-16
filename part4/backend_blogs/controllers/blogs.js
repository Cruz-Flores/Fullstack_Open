const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !token.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(token.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await User.findByIdAndUpdate(token.id, user);
  await savedBlog.populate('user', { username: 1, name: 1 });
  response.json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.user.id);

  const blog = {
    ...body,
    user: user._id,
  };

  const actualizedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 });

  response.json(actualizedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const token = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !token.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(token.id);
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'Only the creator can delete blogs' });
  }

  await Blog.findByIdAndRemove(request.params.id); //await blog.remove() ???
  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString()
  );
  await User.findByIdAndUpdate(token.id, user);
  response.status(204).end();
});

module.exports = blogsRouter;
