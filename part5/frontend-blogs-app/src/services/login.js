import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const loginBlogs = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginService = {
  loginBlogs,
};

export { loginService };
