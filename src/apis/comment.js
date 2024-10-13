import instance from './instance';

const writeComment = (formData) =>
  instance
    .post('/api/board/comments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
      },
    })
    .then(() => {})
    .catch((e) => {
      console.log(e);
      alert('게시글 작성에 실패 했습니다');
    });

export const deleteComment = (commentId) =>
  instance.delete(`/api/board/comments/${commentId}`);

export const modifyComment = (data, commentId) =>
  instance.patch(`/api/board/comments/${commentId}`, {
    content: data.content,
  });

export default writeComment;
