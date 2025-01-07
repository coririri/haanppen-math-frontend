import { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import InputImageButton from '../atoms/InputImageButton';
import IconButton from '../atoms/IconButton';
import DropdownMenu from '../molecules/DropdownMenu';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import getAllTeachers from '../../apis/teacher';
import writeQuery from '../../apis/question';
import uploadImageToS3 from '../../apis/media';

function WriteQueryPage() {
  const [imgPreview, setImgePreview] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [questionText, setQuestionText] = useState(''); // 질문 텍스트 상태
  const [questionTitle, setQuestionTitle] = useState('');
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeacherindex, setSelectedTeacherindex] = useState(0);
  const navigate = useNavigate();

  const finishWrite = async () => {
    try {
      if (questionTitle === '') {
        alert('질문의 제목은 필수입니다.');
        return;
      }

      if (questionText === '' && imgFiles.length === 0) {
        alert('질문에 내용을 적어주세요.');
        return;
      }
      const images = [];

      for (let i = 0; i < imgFiles.length; i += 1) {
        const formData = new FormData();
        formData.append('image', imgFiles[i]);
        const { data } = await uploadImageToS3(formData);
        images.push(data.imageUrl);
      }
      const dataToServer = {
        title: questionTitle,
        content: questionText,
        images,
      };

      if (selectedTeacherindex !== 0)
        dataToServer.targetMemberId = teacherList[selectedTeacherindex - 1].id;
      else dataToServer.targetMemberId = null;
      console.log(dataToServer);
      writeQuery(dataToServer, navigate);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllTeachers();
        setTeacherList([...data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteImageButton = (index) => {
    setImgFiles(() => [
      ...imgFiles.slice(0, index),
      ...imgFiles.slice(index + 1, imgFiles.length),
    ]);
    setImgePreview(() => [
      ...imgPreview.slice(0, index),
      ...imgPreview.slice(index + 1, imgFiles.length),
    ]);
  };

  return (
    <div className="w-full ">
      {/* 제목 입력 필드 */}
      <div className="lg:w-[380px] md:w-[300px] w-[230px] mx-auto mt-6">
        <input
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full h-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg"
        />
      </div>

      {/* DropdownMenu */}
      <div className="w-[233px] mx-auto mt-6">
        <DropdownMenu
          textArr={['지정 안함', ...teacherList.map((teacher) => teacher.name)]}
          selectedIndex={selectedTeacherindex}
          setSelectedIndex={setSelectedTeacherindex}
        />
      </div>

      {/* 질문 입력 필드 */}
      <div className="lg:w-[380px] md:w-[300px] w-[280px] mx-auto mt-6">
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="질문을 작성하세요"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300 hover:shadow-lg"
        />
      </div>

      {/* 이미지 미리보기 */}
      <div className="block lg:w-[404px] md:w-[404px] w-[300px] mx-auto">
        {imgPreview.map((src, index) => (
          <div className="g:w-[404px] md:w-[404px] w-[300px] mx-auto mt-6 relative transition-transform transform hover:scale-105 duration-300">
            <button
              className="absolute right-4 top-2 bg-black rounded-lg p-1 transition-colors duration-300 hover:bg-red-600"
              type="button"
              aria-label="삭제"
              onClick={() => handleDeleteImageButton(index)}
            >
              <IoMdClose size="20px" color="white" />
            </button>

            <img
              className="lg:w-[380px] md:w-[380px] w-[300px] mx-auto rounded-lg shadow-lg"
              src={src}
              alt={`이미지 ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* 버튼 섹션 */}
      <div className="w-full absolute bottom-4">
        <div className="w-full flex justify-between px-12">
          <IconButton
            bgColor="white"
            text="완료"
            icon={<BsFillPencilFill size="1.5rem" />}
            handleClick={() => finishWrite()}
            className="transition-transform transform hover:scale-110 duration-300 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          />
          <InputImageButton
            setImgFiles={setImgFiles}
            setImgPreview={setImgePreview}
            className="transition-transform transform hover:scale-110 duration-300 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
          />
        </div>
      </div>
    </div>
  );
}

export default WriteQueryPage;
