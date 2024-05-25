import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImages from '../../images/loginPage/lg_logo_image.png';
import { idValidation, passwordValidation } from '../../utils/loginValidation';
import login from '../../apis/login';
import LoginForm from '../organisms/LoginForm';

function LoginPage() {
  const [userForm, setUserForm] = useState({ id: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { id, password } = userForm;
    let tempErrorMessage = idValidation(id);
    tempErrorMessage =
      tempErrorMessage === '' ? passwordValidation(password) : tempErrorMessage;
    setErrorMessage(tempErrorMessage);
  }, [userForm.id, userForm.password]);

  const handleLoginClick = () => {
    login(userForm, setErrorMessage, navigate);
  };

  return (
    <main className="lg:w-[1440px] md:w-[834px] w-[428px] mx-auto h-[100vh] flex flex-col items-center justify-center bg-hpLightGray ">
      <div className="mb-24">
        <img
          className="mx-auto md:w-[361px] w-[300px]"
          src={logoImages}
          alt="한편의 수학 로고 이미지"
        />
      </div>
      <LoginForm
        setUserForm={setUserForm}
        errorMessage={errorMessage}
        handleLoginClick={handleLoginClick}
      />
    </main>
  );
}

export default LoginPage;
