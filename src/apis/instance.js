import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
  withCredentials: true, // logout을 위해
});

export const loginInstance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
  withCredentials: true, // http-only 쿠키를 받기 위해
});

instance.interceptors.request.use(async (config) => {
  // accessToken이 없거나 만료된 경우 새로운 토큰을 가져오는 로직

  try {
    const response = await loginInstance.post('/api/login/refresh');

    const newToken = response.data.accessToken;
    const { role, userName } = response.data;
    instance.defaults.headers.common.Authorization = newToken;
    config.headers.Authorization = newToken;

    localStorage.setItem('role', role);
    localStorage.setItem('userName', userName);
  } catch (error) {
    console.error('토큰을 갱신하는 중 에러가 발생했습니다:', error);
  }

  return config;
});

export default instance;
