/* eslint-disable no-underscore-dangle */
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
  instance.defaults.headers.common.Authorization =
    localStorage.getItem('hp_accessToekn');
  config.headers.Authorization = localStorage.getItem('hp_accessToekn');

  return config;
});

// 응답 인터셉터 (에러 핸들링 포함)
instance.interceptors.response.use(
  (response) => response, // 응답 성공 시 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // AccessToken 만료로 인한 에러 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 무한 재요청 방지

      try {
        const response = await loginInstance.post('/api/login/refresh');

        const newToken = response.data.accessToken;
        const { role, userName } = response.data;
        instance.defaults.headers.common.Authorization = newToken;
        localStorage.setItem('hp_accessToekn', newToken);
        localStorage.setItem('role', role);
        localStorage.setItem('userName', userName);
        originalRequest.headers.Authorization = newToken;
        return instance(originalRequest); // 요청 재시도
      } catch (refreshError) {
        return Promise.reject(refreshError); // 갱신 실패 시 에러 반환
      }
    }

    return Promise.reject(error); // 다른 에러는 그대로 반환
  },
);

export default instance;
