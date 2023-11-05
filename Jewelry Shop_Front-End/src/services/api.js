import axios from 'axios';

// Create an Axios instance with custom configuration
const api = axios.create({
  baseURL: process.env.URL_SERVER, // The base URL for your API
});

export default api;
