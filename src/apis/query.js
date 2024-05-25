import instance from './instance';

const writeQuery = (formData, navigate) => {
  instance
    .post('/api/board/questions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
      },
    })
    .then(() => {
      navigate('/question-board');
      console.log('게시글 작성 성공');
    })
    .catch(() => {
      alert('게시글 작성에 실패 했습니다');
      console.log('게시글 작성 실패');
    });
};

export default writeQuery;
