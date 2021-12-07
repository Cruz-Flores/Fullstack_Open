const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper.js');
const app = require('../app.js');
const api = supertest(app);
const Blog = require('../models/blog.js');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as jason', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('id checker', async () => {
  const blogToEvaluate = await api
    .get(`/api/blogs/`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(blogToEvaluate.body[0].id).toBeDefined();
});

test('a blog can be added', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.findBlogs();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test('a blog without likes property set default 0', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.findBlogs();
  expect(blogsAtEnd[6].likes).toBe(0);
});

test('a blog without title cant be added', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 12,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
