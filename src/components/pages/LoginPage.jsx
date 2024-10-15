import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImages from '../../images/loginPage/lg_logo_image.png';
import phoneNumberValidation from '../../utils/idValidation';
import passwordValidation from '../../utils/passwordValidation';
import login from '../../apis/login';
import LoginForm from '../organisms/LoginForm';
import FindPasswordModal from '../modals/FindPasswordModal';

function LoginPage() {
  const [userForm, setUserForm] = useState({ id: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installable, setInstallable] = useState(false);
  const navigate = useNavigate();
  const [findPasswordModalOpen, setFindPasswordModalOpen] = useState(false);

  // ID와 패스워드 유효성 검사
  useEffect(() => {
    const { id, password } = userForm;
    let tempErrorMessage = phoneNumberValidation(id);
    tempErrorMessage =
      tempErrorMessage === '' ? passwordValidation(password) : tempErrorMessage;
    setErrorMessage(tempErrorMessage);
  }, [userForm.id, userForm.password]);

  // PWA 설치 이벤트 리스너 설정
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log('beforeinstallprompt 이벤트 발생'); // 이벤트 발생 로그
      setDeferredPrompt(e); // 프롬프트 이벤트 저장
      setInstallable(true); // 설치 가능 상태로 변경
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 이벤트 해제
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleLoginClick = () => {
    login(userForm, setErrorMessage, navigate);
  };

  const handlefindPassword = async () => {
    setFindPasswordModalOpen(true);
  };
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // 설치 프롬프트 실행
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA 설치 완료');
        } else {
          console.log('PWA 설치 거절');
        }
        setDeferredPrompt(null);
        setInstallable(false);
      });
    }
  };

  console.log('Installable: ', installable); // installable 상태 출력

  return (
    <main className="lg:w-[1440px] md:w-[834px] w-full mx-auto h-[100vh] flex flex-col items-center justify-center">
      <FindPasswordModal
        findPasswordModalOpen={findPasswordModalOpen}
        setFindPasswordModalOpen={setFindPasswordModalOpen}
      />
      <div className="mb-24">
        <img
          className="mx-auto md:w-[250px] w-[220px]"
          src={logoImages}
          alt="한편의 수학 로고 이미지"
        />
      </div>
      <LoginForm
        setUserForm={setUserForm}
        errorMessage={errorMessage}
        handleLoginClick={handleLoginClick}
      />

      {installable ? (
        <div className="flex justify-center">
          {/* PWA 설치 버튼 추가 */}
          <button
            onClick={handleInstallClick}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mr-2"
            type="button"
          >
            앱 설치
          </button>
          <button
            onClick={handlefindPassword}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ml-2"
            type="button"
          >
            비밀번호 찾기
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={handlefindPassword}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            type="button"
          >
            비밀번호 찾기
          </button>
        </div>
      )}
    </main>
  );
}

export default LoginPage;
