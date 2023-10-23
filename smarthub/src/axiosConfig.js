import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8090', 
  timeout: 10000, 
  withCredentials: false, 
});

export default axiosInstance;