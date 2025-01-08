import React, { useEffect, useState } from 'react';
import DropdownMenu from '../molecules/DropdownMenu';
import {
  deleteCategory,
  getRootCategory,
  getSubCategory,
} from '../../apis/onlineLesson';
import AddCategoryModal from '../modals/AddCategoryModal';
import { CategoryType } from '../../types/categoryType';

function LessonCategoryManagementPage() {
  const [mainCategorySelected, setMainCategorySelected] = useState<number>(0);
  const [subCategorySelected, setSubCategorySelected] = useState<number>(0);
  const [mainCategorys, setMainCategorys] = useState<CategoryType[]>([]);
  const [subCategorys, setSubCategorys] = useState<CategoryType[]>([]);
  const [mainAddionModalOpen, setMainAdditionModalOpen] =
    useState<boolean>(false);
  const [subAddionModalOpen, setSubAdditionModalOpen] =
    useState<boolean>(false);
  const [addCategoryName, setAddCategoryName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainCategorysResponse = await getRootCategory();
        setMainCategorys(mainCategorysResponse.data);
        if (mainCategorysResponse.data.length === 0) setSubCategorys([]);
        else {
          const subategorysResponse = await getSubCategory(
            mainCategorysResponse.data[0].categoryId,
          );
          setSubCategorys(subategorysResponse.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subategorysResponse = await getSubCategory(
          mainCategorys[mainCategorySelected].categoryId,
        );
        setSubCategorys(subategorysResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [mainCategorySelected]);

  return (
    <div className="flex justify-center mx-auto mt-12">
      <div>
        <div className="text-2xl font-semibold text-gray-700 mb-2 border-b-2 border-gray-300 pb-1">
          대분류
        </div>
        <div className="flex items-center justify-center mr-4">
          <AddCategoryModal
            type="main"
            categoryName={addCategoryName}
            setCategoryName={setAddCategoryName}
            modalOpen={mainAddionModalOpen}
            setModalOpen={setMainAdditionModalOpen}
            setMainCategorys={setMainCategorys}
            setSubCategorys={setSubCategorys}
          />
          <DropdownMenu
            textArr={mainCategorys.map(
              (mainCategory) => mainCategory.categoryName,
            )}
            selectedIndex={mainCategorySelected}
            setSelectedIndex={setMainCategorySelected}
          />
          <button
            type="button"
            className="ml-4 px-[11px] text-center font-bold text-3xl text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-md transition-all duration-300 transform hover:scale-110"
            onClick={() => {
              setMainAdditionModalOpen(true);
            }}
          >
            +
          </button>
          <button
            type="button"
            className="ml-4 px-[11px] text-center font-bold text-3xl text-white bg-red-500 hover:bg-red-600 rounded-full shadow-md transition-all duration-300 transform hover:scale-110"
            onClick={async () => {
              try {
                console.log('삭제 버튼 클릭');
                // 삭제 관련 로직 추가
                await deleteCategory(
                  mainCategorys[mainCategorySelected].categoryId,
                );
                setMainCategorySelected(0);
                setSubCategorySelected(0);
                const mainCategorysResponse = await getRootCategory();
                setMainCategorys(mainCategorysResponse.data);
                if (mainCategorysResponse.data.length === 0)
                  setSubCategorys([]);
                else {
                  const subategorysResponse = await getSubCategory(
                    mainCategorysResponse.data[0].categoryId,
                  );
                  setSubCategorys(subategorysResponse.data);
                }
              } catch (e) {
                console.log(e);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold text-gray-700 mb-2 border-b-2 border-gray-300 pb-1">
          소분류
        </div>
        <div className="flex items-center justify-center ml-4">
          <AddCategoryModal
            type="sub"
            mainCategoryId={mainCategorys[mainCategorySelected]?.categoryId}
            categoryName={addCategoryName}
            setCategoryName={setAddCategoryName}
            modalOpen={subAddionModalOpen}
            setModalOpen={setSubAdditionModalOpen}
            setMainCategorys={setMainCategorys}
            setSubCategorys={setSubCategorys}
            mainCategorys={mainCategorys}
            mainCategorySelected={mainCategorySelected}
          />
          <DropdownMenu
            textArr={subCategorys.map(
              (subCategory) => subCategory.categoryName,
            )}
            selectedIndex={subCategorySelected}
            setSelectedIndex={setSubCategorySelected}
          />
          <button
            type="button"
            className="ml-4 px-[11px] text-center font-bold text-3xl text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-md transition-all duration-300 transform hover:scale-110"
            onClick={() => {
              setSubAdditionModalOpen(true);
            }}
          >
            +
          </button>
          <button
            type="button"
            className="ml-4 px-[11px] text-center font-bold text-3xl text-white bg-red-500 hover:bg-red-600 rounded-full shadow-md transition-all duration-300 transform hover:scale-110"
            onClick={async () => {
              try {
                console.log('삭제 버튼 클릭');
                // 삭제 관련 로직 추가
                await deleteCategory(
                  subCategorys[subCategorySelected].categoryId,
                );
                setSubCategorySelected(0);

                const subategorysResponse = await getSubCategory(
                  mainCategorys[mainCategorySelected].categoryId,
                );
                setSubCategorys(subategorysResponse.data);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonCategoryManagementPage;
