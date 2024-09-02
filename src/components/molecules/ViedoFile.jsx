import { useState } from 'react';
import { FcFolder } from 'react-icons/fc';

function VideoFile() {
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);
  return (
    <div className="w-[140px] h-[160px] flex flex-col items-center relative">
      <div className="group">
        <button
          type="button"
          aria-label="폴더"
          className={`flex items-center justify-center w-[130px] h-[130px] border-solid border-[1px] border-[#C0C0C0] rounded-3xl  ${isChecked ? 'bg-hpLightBlue/10' : 'group-hover:bg-hpLightBlue/10'}`}
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
      <span className="font-bold text-sm mt-1">M11 00949.mp4</span>
    </div>
  );
}

export default VideoFile;
