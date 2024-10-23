import { useEffect, useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import { useSearchParams } from 'react-router-dom';

function Folder({ name, setCheckedDirectoryArr, index }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setCheckedDirectoryArr((prev) => {
      const copiedCheckedDelectedDirectoryArr = [...prev];
      if (isChecked) {
        // 추가할때
        copiedCheckedDelectedDirectoryArr.push(index);
        return copiedCheckedDelectedDirectoryArr;
      }
      // 삭제할때
      return copiedCheckedDelectedDirectoryArr.filter(
        (deletedIndex) => deletedIndex !== index,
      );
    });
  }, [isChecked]);

  return (
    <div className="w-[140px] max-h-[160px] flex flex-col items-center relative">
      <div className="group">
        <button
          type="button"
          onClick={() => {
            const currentBreadscrumb = searchParams.get('breadscrum');
            searchParams.set('breadscrum', `${currentBreadscrumb}_${name}`);
            // setSearchParams를 사용하여 URL을 업데이트합니다.
            setSearchParams(searchParams);
            setCheckedDirectoryArr([]);
          }}
          aria-label="폴더"
          className={`flex items-center justify-center w-[130px] h-[130px] border-solid border-[1px] border-[#C0C0C0] rounded-3xl outline-none ${isChecked ? 'bg-hpLightBlue/10' : 'group-hover:bg-hpLightBlue/10'}`}
        >
          <FcFolder size="4.5rem" />
        </button>
        <input
          type="checkbox"
          onChange={() => {
            setIsChecked((prev) => !prev);
          }}
          className={`w-[15px] h-[15px] absolute top-4 left-4 border-solid border-[1px] border-hpLightGray bg-white hover:border-black ${isChecked ? 'visible' : 'invisible group-hover:visible hover:visible'}`}
        />
      </div>
      <span className="font-bold text-sm mt-1">{name}</span>
    </div>
  );
}

export default Folder;
