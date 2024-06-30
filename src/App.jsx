import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './components/pages/LoginPage';
import NonFoundPageServerError from './components/pages/NonFoundPageServerError';
import ServerErrorPage from './components/pages/ServerErrorPage';
import NonFoundClientError from './components/pages/NonFoundPageClientError';
import CommonLayout from './components/layouts/CommonLayout';
import WriteQueryPage from './components/pages/WriteQueryPage';
import ManagementPage from './components/pages/ManagementPage';
import UserInformationPage from './components/pages/UserInformationPage';
import QueryBoardPage from './components/pages/QueryBoardPage';
import QuestionPage from './components/pages/QuestionPage';

function App() {
  const queryClient = new QueryClient();
  ReactModal.setAppElement('#root');
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 공통 레이아웃 */}
          <Route path="/" element={<CommonLayout />}>
            <Route path="query-board" element={<QueryBoardPage />} />
            <Route path="write-query" element={<WriteQueryPage />} />
            <Route path="management" element={<ManagementPage />} />
            <Route path="user-information" element={<UserInformationPage />} />
            <Route path="question/:id" element={<QuestionPage />} />
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
    </QueryClientProvider>
  );
}

export default App;
