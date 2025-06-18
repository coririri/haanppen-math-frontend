import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import phoneNumberValidation from '../../utils/idValidation';
import passwordValidation from '../../utils/passwordValidation';
import login from '../../apis/login';
import LoginForm from '../organisms/LoginForm';
import FindPasswordModal from '../modals/FindPasswordModal';
import checkUnsupportedBrowser from '../../utils/checkUnsupportedBrowser';
import AlertModal from '../modals/AlertModal';

function LoginPage() {
  const [userForm, setUserForm] = useState<{
    id: string;
    password: string;
  }>({ id: '', password: '' });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [iosAlertModalOepn, setIosAlertModalOepn] = useState(false);

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null); // Use Event type

  const navigate = useNavigate();

  const [findPasswordModalOpen, setFindPasswordModalOpen] =
    useState<boolean>(false);

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
    const handleBeforeInstallPromptEvent = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(event); // 프롬프트 이벤트 저장
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPromptEvent,
    );

    // 이벤트 해제
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPromptEvent,
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
    const isUnsupportedBrowser = checkUnsupportedBrowser();
    if (isUnsupportedBrowser) {
      setIosAlertModalOepn(true);
    }

    if (!isUnsupportedBrowser) {
      if (deferredPrompt) {
        const promptEvent: BeforeInstallPromptEvent = deferredPrompt;
        promptEvent.prompt(); // 설치 프롬프트 실행
        promptEvent.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('PWA 설치 완료');
            setDeferredPrompt(null);
          } else {
            console.log('PWA 설치 거절');
          }
        });
      } else {
        alert('이미 저희 서비스를 설치해주셨어요!');
      }
    }
  };

  return (
    <main className="lg:w-[1440px] md:w-[834px] w-full mx-auto h-[100vh] flex flex-col items-center justify-center">
      <AlertModal
        alertModalOpen={iosAlertModalOepn}
        setAlertModalOpen={setIosAlertModalOepn}
        message="공유 아이콘 -> 홈 화면에 추가를 클릭해 앱으로 편리하게 이용해보세요!"
      />
      <FindPasswordModal
        findPasswordModalOpen={findPasswordModalOpen}
        setFindPasswordModalOpen={setFindPasswordModalOpen}
      />
      <div className="mb-24">
        <img
          className="mx-auto md:w-[250px] w-[220px]"
          src="https://www.hpmath.co.kr/images/lg_logo_image.png"
          alt="한편의 수학 로고 이미지"
        />
      </div>
      <LoginForm
        setUserForm={setUserForm}
        errorMessage={errorMessage}
        handleLoginClick={handleLoginClick}
      />
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
      {/* ✅ 개인정보처리방침 링크 추가 */}
      <div className="mt-6 text-sm text-gray-600 underline hover:text-blue-600 transition">
        <a
          href="https://www.hpmath.co.kr/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          개인정보처리방침
        </a>
      </div>
    </main>
  );
}

export default LoginPage;
