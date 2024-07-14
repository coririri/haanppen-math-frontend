import instance from './instance';

const writeComment = (formData) => {
  instance
    .post('/api/board/comments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
      },
    })
    .then(() => {
      console.log('게시글 작성 성공');
    })
    .catch((e) => {
      console.log(e);
      alert('게시글 작성에 실패 했습니다');
      console.log('게시글 작성 실패');
    });
};

export default writeComment;
