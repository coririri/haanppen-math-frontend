import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(backendUrl);

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
});

export default instance;
