/* eslint-disable @typescript-eslint/no-empty-function */
import instance from './instance';

const writeComment = (data) =>
  instance
    .post('/api/board/comments', data)
    .then(() => {})
    .catch((e) => {
      console.log(e);
      alert('게시글 작성에 실패 했습니다');
    });

export const deleteComment = (commentId) =>
  instance.delete(`/api/board/comments/${commentId}`);

export const modifyComment = (data, commentId, comment, images) =>
  instance.put(`/api/board/comments`, {
    commentId,
    content: data.content,
    imageSources: [...comment.images.map((value) => value.imageUrl), ...images],
  });

export default writeComment;
