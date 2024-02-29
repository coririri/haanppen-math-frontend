import { useRef } from 'react';
import Input from './components/atoms/Input';

function App() {
  const inputRef = useRef(null);

  return (
    <div className="m-2">
      <Input
        type="search"
        inputRef={inputRef}
        placeholder="반 이름 검색"
        handleClickSearch={() => {
          console.log(inputRef.current?.value);
        }}
      />
    </div>
  );
}

export default App;
