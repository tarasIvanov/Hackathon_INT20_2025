// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8010/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token"); // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
