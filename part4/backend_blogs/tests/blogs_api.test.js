const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

test('blogs are returned as jason', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(0);
});

afterAll(() => {
  mongoose.connection.close();
});
