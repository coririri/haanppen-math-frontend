import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './components/pages/LoginPage';
import CommonLayout from './components/layouts/CommonLayout';
import WriteQueryPage from './components/pages/WriteQueryPage';
import ManagementPage from './components/pages/ManagementPage';
import UserInformationPage from './components/pages/UserInformationPage';
import QueryBoardPage from './components/pages/QueryBoardPage';
import QuestionDetailPage from './components/pages/QuestionDetailPage';
import WriteClassPage from './components/pages/WriteClassPage';
import 'react-datepicker/dist/react-datepicker.css';
import VedioManagementPage from './components/pages/VedioManagementPage';
import MyClassPage from './components/pages/MyClassPage';
import LessonPage from './components/pages/LessonPage';
import LessonOverviewPage from './components/pages/LessonOverviewPage';
import OnlineLessonPage from './components/pages/OnlineLessonPage';
import PreviewClassPage from './components/pages/PreviewClassPage';
import ServerErrorPage from './components/pages/ServerErrorPage';
import NetworkErrorPage from './components/pages/NetworkErrorPage';
import PrivacyPage from './components/pages/PrivacyPage';

// 배포1

function App() {
  const queryClient = new QueryClient();
  ReactModal.setAppElement('#root');
  // build
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 공통 레이아웃 */}
          <Route path="/" element={<CommonLayout />}>
            <Route path="question-board" element={<QueryBoardPage />} />
            <Route path="write-query" element={<WriteQueryPage />} />
            <Route path="management" element={<ManagementPage />} />
            <Route path="user-information" element={<UserInformationPage />} />
            <Route path="question/:id" element={<QuestionDetailPage />} />

            <Route path="enroll-class" element={<WriteClassPage />} />
            <Route path="vedio-management" element={<VedioManagementPage />} />
            <Route path="my-class" element={<MyClassPage />} />
            <Route path="preview-class" element={<PreviewClassPage />} />
            <Route path="lesson" element={<LessonPage />} />
            <Route path="online-lesson" element={<OnlineLessonPage />} />
            <Route path="lesson-overview" element={<LessonOverviewPage />} />
          </Route>
          {/* 단독 레이아웃 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/server-error" element={<ServerErrorPage />} />
          <Route path="/network-error" element={<NetworkErrorPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
