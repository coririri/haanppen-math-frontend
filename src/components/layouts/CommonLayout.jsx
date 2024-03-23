import React from 'react';
import { Outlet } from 'react-router-dom';

function CommonLayout() {
  return (
    <div>
      {/* 헤더 */}
      <Outlet />
    </div>
  );
}

export default CommonLayout;
