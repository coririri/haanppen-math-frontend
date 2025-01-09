import React, { SetStateAction, useState } from 'react';
import ReactModal from 'react-modal';

import {
  getRootCategory,
  getSubCategory,
  postCategory,
} from '../../apis/onlineLesson';
import { CategoryType } from '../../types/categoryType';

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '330px',
    height: '200px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
    padding: '20px',
  },
};

interface AddCategoryModalProps {
  type: 'main' | 'sub';
  mainCategoryId?: number;
  categoryName: string;
  setCategoryName: React.Dispatch<SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setMainCategorys: React.Dispatch<SetStateAction<CategoryType[]>>;
  setSubCategorys: React.Dispatch<SetStateAction<CategoryType[]>>;
  mainCategorys?: CategoryType[];
  mainCategorySelected?: number;
}

function AddCategoryModal({
  type,
  mainCategoryId = -1,
  categoryName,
  setCategoryName,
  modalOpen,
  setModalOpen,
  setMainCategorys,
  setSubCategorys,
  mainCategorys = [],
  mainCategorySelected = -1,
}: AddCategoryModalProps) {
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleSubmit = async () => {
    if (categoryName.trim() === '') {
      setError('카테고리 이름을 입력해주세요.');
      return;
    }

    try {
      if (type === 'main') await postCategory(categoryName);
      else await postCategory(categoryName, mainCategoryId);

      const mainCategorysResponse = await getRootCategory();
      setMainCategorys(mainCategorysResponse.data);
      if (mainCategorysResponse.data.length === 0) setSubCategorys([]);
      else {
        const subategorysResponse = await getSubCategory(
          mainCategorys[mainCategorySelected].categoryId,
        );
        setSubCategorys(subategorysResponse.data);
      }
    } catch (e) {
      console.log(e);
    }

    // 성공적으로 처리된 경우 모달 닫기
    setModalOpen(false);
    setCategoryName('');
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
      ariaHideApp={false} // 테스트 시 콘솔 경고 방지
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4">
          {type === 'main' ? '메인' : '서브'} 카테고리 추가
        </h2>
        <input
          type="text"
          placeholder="새 카테고리 이름"
          value={categoryName}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-end w-full">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
            type="button"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            type="button"
          >
            추가
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default AddCategoryModal;
