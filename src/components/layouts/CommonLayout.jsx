import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import instance from '../../apis/instance';
import Header from '../organisms/Header';
import Navigation from '../organisms/Navigation';
import { refreshLogin } from '../../apis/login';

function CommonLayout() {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const curToken = instance.defaults.headers.common.Authorization;
      const curUserName = localStorage.getItem('userName');
      const curRole = localStorage.getItem('role');
      if (!curToken || !curUserName || !curRole) {
        refreshLogin(navigate);
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
