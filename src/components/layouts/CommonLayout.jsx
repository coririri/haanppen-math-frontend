import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import instance, { refreshInstance } from '../../apis/instance';
import Header from '../organisms/Header';
import Navigation from '../organisms/Navigation';

function CommonLayout() {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const curToken = instance.defaults.headers.common.Authorization;
      const curUserName = localStorage.getItem('userName');
      const curRole = localStorage.getItem('role');
      if (!curToken || !curUserName || !curRole) {
        try {
          navigate('/');
          const response = await refreshInstance.post('/api/login/refresh');
          const newToken = response.data.accessToken;
          const { role, userName } = response.data;
          instance.defaults.headers.common.Authorization = newToken;
          console.log(instance.defaults.headers.common.Authorization);
          localStorage.setItem('role', role);
          localStorage.setItem('userName', userName);
        } catch (error) {
          console.error('토큰을 갱신하는 중 에러가 발생했습니다:', error);
          // 토큰 갱신에 실패한 경우 여기에 적절한 처리를 추가할 수 있습니다.
          alert('로그인 페이지로 이동합니다');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Navigation />
      {localStorage.getItem('role') === 'STUDENT' ? (
        <div className="w-[428px] h-[712px] relative border-[12px] mx-auto  border-hpBackgroundGray border-solid">
          <Outlet />
        </div>
      ) : (
        <div className="w-[1400px] h-[680px] relative mx-auto border-[20px] border-hpBackgroundGray border-solid">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default CommonLayout;
