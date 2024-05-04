import { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import InputImageButton from '../atoms/InputImageButton';
import IconButton from '../atoms/IconButton';

function WriteQueryPage() {
  const [, setImgFiles] = useState([]);
  const finishWrite = () => {};

  return (
    <div className="w-full">
      <div className="w-full absolute bottom-4">
        <div className="w-full flex justify-between px-12">
          <IconButton
            bgColor="white"
            text="완료"
            icon={<BsFillPencilFill size="1.5rem" />}
            handleClick={finishWrite}
          />
          <InputImageButton setImgFiles={setImgFiles} />
        </div>
      </div>
    </div>
  );
}

export default WriteQueryPage;
