function idValidation(id: string): string {
  const idRegex = /^010[0-9]{8}$/;
  const idTest = idRegex.test(id);

  if (!idTest) {
    return '- 을 제외한 전화번호를 입력해주세요';
  }
  return '';
}

export default idValidation;
