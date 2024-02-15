import { BsPencilFill } from 'react-icons/bs';
import { MdOndemandVideo } from 'react-icons/md';
import IconButton from './components/atoms/IconButton';

function App() {
  return (
    <div className="m-4">
      <div className="mb-8">
        <IconButton
          bgColor="white"
          text="글 쓰기"
          icon={<BsPencilFill color="black" size="1rem" />}
        />
      </div>
      <div className="mb-8">
        <IconButton
          bgColor="white"
          text="완료"
          icon={<BsPencilFill color="black" size="1rem" />}
        />
      </div>
      <div className="mb-8">
        <IconButton
          bgColor="red"
          text="영상 관리"
          icon={<BsPencilFill color="white" size="1.4rem" />}
        />
      </div>
      <IconButton
        bgColor="blue"
        text="영상 관리"
        icon={<MdOndemandVideo color="white" size="1.8rem" />}
      />
    </div>
  );
}

export default App;
