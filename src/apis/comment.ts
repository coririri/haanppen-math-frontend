/* eslint-disable @typescript-eslint/no-empty-function */
import { WriteCommentType } from '../types/commentType';
import instance from './instance';

const writeComment = (data: WriteCommentType) =>
  instance
    .post('/api/board/comments', data)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .then(() => {})
    .catch((e) => {
      console.log(e);
      alert('게시글 작성에 실패 했습니다');
    });

export const deleteComment = (commentId: number) =>
  instance.delete(`/api/board/comments/${commentId}`);

export const modifyComment = (
  data: { content: string },
  commentId: number,
  comment: { images: { imageUrl: string }[] },
  images: string[],
) =>
  instance.put(`/api/board/comments`, {
    commentId,
    content: data.content,
    imageSources: [...comment.images.map((value) => value.imageUrl), ...images],
  });

export default writeComment;
