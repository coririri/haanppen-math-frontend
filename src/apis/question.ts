import { NavigateFunction } from 'react-router-dom';
import instance from './instance';
import { WriteQuestionType } from '../types/question';

const writeQuery = (data: WriteQuestionType, navigate: NavigateFunction) => {
  instance
    .post('/api/board/questions', data)
    .then(() => {
      navigate('/question-board');
      console.log('게시글 작성 성공');
    })
    .catch((e) => {
      console.log(e);
      alert(e);
      console.log('게시글 작성 실패');
    });
};

export const modifyQuery = (
  data: {
    title: string;
    content: string;
    images?: string[];
  },
  questionId: number,
  targetMemberId: number,
  newImages: string[],
) => {
  if (targetMemberId === -1)
    return instance.put(`/api/board/questions`, {
      questionId,
      title: data.title,
      content: data.content,
      imageSources: [...(data.images ?? []), ...newImages],
    });

  return instance.put(`/api/board/questions`, {
    questionId,
    title: data.title,
    content: data.content,
    targetMemberId,
    imageSources: [...(data.images ?? []), ...newImages],
  });
};

export const getQuestionsList = async (page: number, searchValue: string) =>
  instance.get('/api/board/questions', {
    params: {
      size: 8,
      page,
      sort: 'date,DESC',
      title: searchValue,
    },
  });

export const getMyQuestionsList = async (page: number, searchValue: string) =>
  instance.get('/api/board/questions/my', {
    params: {
      size: 8,
      page,
      sort: 'date,DESC',
      title: searchValue,
    },
  });

export const getDetailQuestionById = async (id: number) => {
  const response = await instance.get(`/api/board/questions/${id}`);
  return response.data;
};

export const deleteQuestionById = async (id: number) =>
  instance.delete(`/api/board/questions/${id}`);

export default writeQuery;
