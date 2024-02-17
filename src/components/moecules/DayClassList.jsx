import PropTypes from 'prop-types';
import { MdOndemandVideo } from 'react-icons/md';
import IconButton from '../atoms/IconButton';
import getDayInKorean from '../../utils/getDayInKorean';

function DayClassList({ date, videoLink, children }) {
  return (
    <div className="w-[42rem] h-[10.875rem] border-[0.075rem] border-solid rounded-lg">
      <div className="flex items-center h-[3.3rem] w-[19.3rem] mx-auto">
        <div className="bg-hpLightRed text-white font-sjBold rounded-lg text-[1.32rem] px-[1.625rem] py-[0.2rem] mr-4">
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
      <div className="w-[34.5rem] h-[7.575rem] mx-auto py-2">{children}</div>
    </div>
  );
}

DayClassList.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  videoLink: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DayClassList;
