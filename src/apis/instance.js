import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const refreshInstance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
});

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
});

instance.interceptors.request.use(async (config) => {
  // accessToken이 없거나 만료된 경우 새로운 토큰을 가져오는 로직
  const curToken = instance.defaults.headers.common.Authorization;
  const curUserName = localStorage.getItem('userName');
  const curRole = localStorage.getItem('role');
  if (!curToken || !curUserName || !curRole) {
    try {
      const response = await refreshInstance.post('/api/login/refresh');
      const newToken = response.data.accessToken;
      const { role, userName } = response.data;
      instance.defaults.headers.common.Authorization = newToken;
      localStorage.setItem('role', role);
      localStorage.setItem('userName', userName);
    } catch (error) {
      console.error('토큰을 갱신하는 중 에러가 발생했습니다:', error);
      // 토큰 갱신에 실패한 경우 여기에 적절한 처리를 추가할 수 있습니다.
    }
  }
  return config;
});

export const loginInstance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
});

export default instance;
