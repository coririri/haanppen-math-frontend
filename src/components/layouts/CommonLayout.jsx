import React from 'react';
import { Outlet } from 'react-router-dom';

function CommonLayout() {
  return (
    <div className="h-[100vh]">
      {/* 헤더 */}
      <Outlet />
    </div>
  );
}

export default CommonLayout;
