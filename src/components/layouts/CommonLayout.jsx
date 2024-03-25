import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import instance, { refreshInstance } from '../../apis/instance';

function CommonLayout() {
  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <div className="h-[100vh]">
      {/* 헤더 */}
      <Outlet />
    </div>
  );
}

export default CommonLayout;
