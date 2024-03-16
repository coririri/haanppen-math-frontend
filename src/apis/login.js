import instance from './instance';

const login = (userForm, setErrorMessage) => {
  instance
    .post('/api/login', {
      userPhoneNumber: userForm.id,
      password: userForm.password,
    })
    .then((response) => {
      const token = response.data.accessToken;
      const { role } = response.data;
      instance.defaults.headers.common.Authorization = token;
      localStorage.setItem('role', role);
    })
    .catch((error) => {
      if (error.response) {
        // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        const errorStatus = Number(error.response.status);
        const { errorCode } = error.response.data;
        if (errorStatus >= 400 && errorStatus < 500) {
          // 클라이언트 요청 오류
          if (errorStatus === 404) {
            // 404 페이지로 이동
          } else if (errorCode === '-003') {
            setErrorMessage('비밀번호가 틀렸습니다');
          } else if (errorCode === '-006') {
            setErrorMessage('없는 아이디 입니다.');
          } else if (errorCode === '-101') {
            setErrorMessage('입력 형식이 잘못 됐습니다.');
          }
        } else if (errorStatus >= 500) {
          // 500 페이지로 이동
        }
      } else if (error.request) {
        // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
        // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
        // 보통 cors문제 or 네트워크 오류
        // console을 통해 개발자만 확인
        console.log(error.request);
      } else {
        // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
        // console을 통해 개발자만 확인
        console.log('Error', error.message);
      }
    });
};

export default login;
