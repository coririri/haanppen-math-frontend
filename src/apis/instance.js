import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
});

// 새로운 토큰을 가져오는 함수
const fetchNewToken = async () => {
  const response = await instance.post('/api/login/refresh');
  const newToken = response.data.accessToken;
  const { role } = response.data;
  instance.defaults.headers.common.Authorization = newToken;
  localStorage.setItem('role', role);
  return newToken;
};

instance.interceptors.request.use(async () => {
  // accessToken이 없거나 만료된 경우 새로운 토큰을 가져오는 로직
  let token = instance.defaults.headers.common.Authorization;
  if (!token) {
    try {
      token = await fetchNewToken();
    } catch (error) {
      console.error('토큰을 갱신하는 중 에러가 발생했습니다:', error);
    }
  }
  instance.defaults.headers.common.Authorization = token; // 요청에 토큰 설정
});
export default instance;
