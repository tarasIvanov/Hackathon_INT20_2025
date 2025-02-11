// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8010/api/',
});

export default api;
