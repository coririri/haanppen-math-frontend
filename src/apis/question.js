import instance from './instance';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
      alert('게시글 작성에 실패 했습니다');
      console.log('게시글 작성 실패');
    });
};
export const getQuestionsList = async ({ pageParam, queryKey }) => {
  try {
    const response = await instance.get('/api/board/questions', {
      params: {
        size: 10,
        cursorIndex: pageParam,
        sort: queryKey[1] ?? '',
      },
    });

    const { data } = response;
    console.log(data);
    const { contents } = data;
    console.log(contents);
    for (let i = 0; i < contents.length; i += 1) {
      const question = contents[i];
      if (question.images.length !== 0) {
        const { imageUrl } = question.images[0];
        console.log(`${backendUrl}api/media/${imageUrl}`);
        question.images[0] = `${backendUrl}api/media/${imageUrl}`;
      }
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching questions list:', error);
    throw error;
  }
};

export default writeQuery;
