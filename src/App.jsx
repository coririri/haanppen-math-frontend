import { useState } from 'react';
import DropdownMenu from './components/molecules/DropdownMenu';

function App() {
  const textArr = [
    '입양하세요',
    '브레이크 인',
    '브룩헤이븐 RP',
    '제일 브레이크',
    '밉시티',
    '머더 미스터리 2',
    '자연 재해 생존',
    '배드워즈',
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpenIndexArr, setIsOpenIndexArr] = useState([
    false,
    false,
    false,
    false,
  ]);

  const handleClickDropdownMenu = (index) => {
    let updatedOpenIndexArr = [...isOpenIndexArr];
    if (updatedOpenIndexArr[index] === true) {
      updatedOpenIndexArr[index] = false;
    } else if (updatedOpenIndexArr[index] === false) {
      updatedOpenIndexArr = Array(updatedOpenIndexArr.length).fill(false);
      updatedOpenIndexArr[index] = true;
    }
    setIsOpenIndexArr(updatedOpenIndexArr);
  };

  return (
    <div className="m-2 h-[20rem] flex-col flex justify-between">
      <DropdownMenu
        size="normal"
        textArr={textArr}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        isOpen={isOpenIndexArr[0]}
        order={0}
        handleClick={handleClickDropdownMenu}
      />
      <DropdownMenu
        size="normal"
        textArr={textArr}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        isOpen={isOpenIndexArr[1]}
        order={1}
        handleClick={handleClickDropdownMenu}
      />
      <DropdownMenu
        size="normal"
        textArr={textArr}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        isOpen={isOpenIndexArr[2]}
        order={2}
        handleClick={handleClickDropdownMenu}
      />
    </div>
  );
}

export default App;
