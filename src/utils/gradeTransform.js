const gradeTransform = (grade) => {
  switch (grade) {
    case 1:
      return '초1';
    case 2:
      return '초2';
    case 3:
      return '초3';
    case 4:
      return '초4';
    case 5:
      return '초5';
    case 6:
      return '초6';
    case 7:
      return '중1';
    case 8:
      return '중2';
    case 9:
      return '중3';
    case 10:
      return '고1';
    case 11:
      return '고2';
    case 12:
      return '고3';
    default:
      return '알 수 없음';
  }
};

export default gradeTransform;
