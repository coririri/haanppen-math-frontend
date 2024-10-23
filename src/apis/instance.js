import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 5000,
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
    // 토큰 갱신에 실패한 경우 여기에 적절한 처리를 추가할 수 있습니다.
    // 토큰 갱신에 실패한 경우 여기에 적절한 처리를 추가할 수 있습니다.
    alert('로그인 페이지로 이동합니다');
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }

  return config;
});

export default instance;
