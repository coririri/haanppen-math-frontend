import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import NonFoundPageServerError from './components/pages/NonFoundPageServerError';
import ServerErrorPage from './components/pages/ServerErrorPage';
import NonFoundClientError from './components/pages/NonFoundPageClientError';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/nonfound-pageserver"
          element={<NonFoundPageServerError />}
        />
        <Route path="/server-error" element={<ServerErrorPage />} />
        {/* 404 에러 */}
        <Route path="*" element={<NonFoundClientError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
