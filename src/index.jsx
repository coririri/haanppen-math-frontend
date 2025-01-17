import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

// 대기 중인 서비스 워커가 있다면 메시지 보내기
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      // 대기 중인 서비스 워커가 있는지 확인
      if (registration.waiting) {
        console.log(registration.waiting);
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      // 새 서비스 워커가 설치될 때마다 처리 (업데이트 발견 시)
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
