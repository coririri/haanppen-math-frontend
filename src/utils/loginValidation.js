export function idValidation(id) {
  const idRegex = /^010[0-9]{8}$/;
  const idTest = idRegex.test(id);

  if (!idTest) {
    return '아이디는 010으로 시작하는 11자리 숫자로 이루어져야 합니다';
  }
  return '';
}

export function passwordValidation(password) {
  const num = password.search(/[0-9]/g);
  const eng = password.search(/[a-zA-Z]/gi);
  const spe = password.search(/[!@^]/gi);

  if (password === '0000' || password === 'admin') {
    return '';
  }
  if (password.length < 7 || password.length > 20) {
    return '비밀번호를 8자리 ~ 20자리 이내로 입력해주세요.';
  }
  if (password.search(/\s/) !== -1) {
    return '비밀번호는 공백 없이 입력해주세요.';
  }
  if (num < 0 || eng < 0 || spe < 0) {
    return '비밀번호는 특수문자, 영어, 숫자를 포함해야합니다';
  }
  return '';
}
