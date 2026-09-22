// Frontend/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // This points to your Node.js backend
  withCredentials: true, // This allows the secure login cookies to work
});

export default instance;