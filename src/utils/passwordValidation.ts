function passwordValidation(password: string): string {
  if (password === undefined) return '';
  // const num = password.search(/[0-9]/g);
  // const eng = password.search(/[a-zA-Z]/gi);
  // const spe = password.search(/[!@^]/gi);

  if (password === '0000' || password === 'admin') {
    return '';
  }
  if (password.length < 7 || password.length > 20) {
    return '비밀번호를 8자리 ~ 20자리 이내로 입력해주세요.';
  }
  if (password.search(/\s/) !== -1) {
    return '비밀번호는 공백 없이 입력해주세요.';
  }
  // if (num < 0 || eng < 0 || spe < 0) {
  //   return '비밀번호는 특수문자, 영어, 숫자를 포함해야합니다';
  // }
  return '';
}

export const isPasswordSame = (
  password: string,
  newPassword: string,
): string => {
  if (password === newPassword) return '';
  return '기존 비밀번호와 일치하지 않습니다';
};

export default passwordValidation;
