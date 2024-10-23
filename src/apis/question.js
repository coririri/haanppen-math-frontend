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
    .catch((e) => {
      console.log(e);
      alert(e);
      console.log('게시글 작성 실패');
    });
};

export const modifyQuery = (data, questionId, targetMemberId) =>
  instance.put(`/api/board/questions`, {
    questionId,
    title: data.title,
    content: data.content,
    targetMemberId,
  });

export const getQuestionsList = async (page, searchValue) =>
  instance.get('/api/board/questions', {
    params: {
      size: 8,
      page,
      sort: 'date,DESC',
      title: searchValue,
    },
  });

export const getMyQuestionsList = async (page, searchValue) =>
  instance.get('/api/board/questions/my', {
    params: {
      size: 8,
      page,
      sort: 'date,DESC',
      title: searchValue,
    },
  });

export const getDetailQuestionById = async (id) => {
  const response = await instance.get(`/api/board/questions/${id}`);
  return response.data;
};

export const deleteQuestionById = async (id) =>
  instance.delete(`/api/board/questions/${id}`);

export default writeQuery;
