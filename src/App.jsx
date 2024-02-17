import { BsPencilFill } from 'react-icons/bs';
import { MdOndemandVideo } from 'react-icons/md';
import IconButton from './components/atoms/IconButton';

function App() {
  return (
    <div className="m-4">
      <IconButton
        bgColor="white"
        text="로그아웃"
        icon={<BsPencilFill color="black" size="1.5rem" />}
      />
      <div className="mb-8">
        <IconButton
          bgColor="white"
          text="완료"
          icon={<BsPencilFill color="black" size="1.5rem" />}
        />
      </div>
      <div className="mb-8">
        <IconButton
          bgColor="red"
          text="영상 관리"
          icon={<BsPencilFill color="white" size="1rem" />}
        />
      </div>
      <IconButton
        bgColor="blue"
        text="영상 관리"
        icon={<MdOndemandVideo color="white" size="1rem" />}
      />
    </div>
  );
}

export default App;
