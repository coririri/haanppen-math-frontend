import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import NonFoundPageServerError from './components/pages/NonFoundPageServerError';
import ServerErrorPage from './components/pages/ServerErrorPage';
import NonFoundClientError from './components/pages/NonFoundPageClientError';
import CommonLayout from './components/layouts/CommonLayout';
import WriteQueryPage from './components/pages/WriteQueryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 레이아웃 */}
        <Route path="/" element={<CommonLayout />}>
          <Route path="write-query" element={<WriteQueryPage />} />
        </Route>
        {/* 404 에러 */}
        <Route path="*" element={<NonFoundClientError />} />
        {/* 단독 레이아웃 */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/nonfound-pageserver"
          element={<NonFoundPageServerError />}
        />
        <Route path="server-error" element={<ServerErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
