import { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import InputImageButton from '../atoms/InputImageButton';
import IconButton from '../atoms/IconButton';
import TeacherCarousel from '../molecules/TeacherCarousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import getAllTeachers from '../../apis/teacher';
import writeQuery from '../../apis/query';

function WriteQueryPage() {
  const [imgPreview, setImgePreview] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [teacherList, setTeacherList] = useState(['선택 없음']);
  const [selectedTeacherindex, setSelectedTeacherindexIndex] = useState(0);
  const { navigate } = useNavigate();

  const finishWrite = () => {
    const formData = new FormData();
    imgFiles.forEach((img) => {
      formData.append('images', img);
    });
    formData.append('targetMemberId', teacherList[selectedTeacherindex].id);
    formData.append('content', '없음');
    formData.append('title', '제목 없음');
    writeQuery(formData, navigate);
    // formdata를 활용해 질문 글 작성
  };

  useEffect(() => {
    getAllTeachers(setTeacherList);
    // 질문 가능한 선생님 조회
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
    <div className="w-full">
      <div className="w-[233px] mx-auto mt-6">
        <TeacherCarousel
          teacherList={teacherList}
          selectedTeacherindex={selectedTeacherindex}
          setSelectedTeacherindexIndex={setSelectedTeacherindexIndex}
        />
      </div>
      <div className="text-center text-lg mt-4 font-bold text-hpRed">
        *사진으로만 질문하세요*
      </div>
      <div className="block w-[404px] mx-auto">
        <Slider
          dots
          infinite={false}
          speed={5}
          slidesToScroll={1}
          slidesToShow={1}
          arrows={false}
        >
          {imgPreview.map((src, index) => (
            <div className="w-[404px] h-[400px] mx-auto mt-6 relative">
              <button
                className="absolute right-2 top-4 bg-black"
                type="button"
                aria-label="삭제"
                onClick={() => {
                  handleDeleteImageButton(index);
                }}
              >
                <IoMdClose size="20px" color="white" />
              </button>
              <img className="w-[404px] h-[400px]" src={src} alt="이미지 1" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-full absolute bottom-4">
        <div className="w-full flex justify-between px-12">
          <IconButton
            bgColor="white"
            text="완료"
            icon={<BsFillPencilFill size="1.5rem" />}
            handleClick={finishWrite}
          />
          <InputImageButton
            setImgFiles={setImgFiles}
            setImgePreview={setImgePreview}
          />
        </div>
      </div>
    </div>
  );
}

export default WriteQueryPage;
