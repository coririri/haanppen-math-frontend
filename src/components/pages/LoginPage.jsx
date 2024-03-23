import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImages from '../../images/loginPage/logo_image.png';
import { idValidation, passwordValidation } from '../../utils/loginValidation';
import login from '../../apis/login';
import LoginForm from '../organisms/LoginForm';

function LoginPage() {
  const [userForm, setUserForm] = useState({ id: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = userForm;
    setErrorMessage(idValidation(id));
  }, [userForm.id]);

  useEffect(() => {
    const { password } = userForm;
    setErrorMessage(passwordValidation(password));
  }, [userForm.password]);

  const handleLoginClick = () => {
    login(userForm, setErrorMessage, navigate);
  };

  return (
    <main className="w-full h-[1024px] pb-36 flex flex-col items-center justify-center bg-hpLightGray ">
      <div className="mb-24">
        <img
          className="mx-auto"
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
