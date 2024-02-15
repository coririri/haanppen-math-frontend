import PropTypes from 'prop-types';
import { MdOndemandVideo } from 'react-icons/md';
import IconButton from '../atoms/IconButton';
import getDayInKorean from '../../utils/getDayInKorean';

function DayClassList({ date, videoLink, children }) {
  return (
    <div className="w-[30rem] h-[8rem] border-[0.075rem] border-solid rounded-lg pb-2">
      <div className="flex h-12 items-center w-[18.5rem] mx-auto">
        <div className="bg-hpLightRed text-white font-sjBold px-4 py-1 h-9 rounded-lg text-xl mr-2">
          {date.getMonth() + 1}.{date.getDate()}({getDayInKorean(date.getDay())}
          ) 수업
        </div>
        <IconButton
          bgColor="blue"
          text="영상 확인"
          handleClick={() => {
            console.log(videoLink);
          }}
          icon={<MdOndemandVideo color="white" size="1.7rem" />}
        />
      </div>
      <div className="w-[28rem] mx-auto mt-2 mb-2">{children}</div>
    </div>
  );
}

DayClassList.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  videoLink: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DayClassList;
