import { useState } from 'react';
import OrderedList from './components/molecules/OrderedList';

function App() {
  const [orderedState, setOrderedState] = useState([
    [
      'Theme 1. 등차수열의 대칭성과 합의 구조',
      'Theme 2. 등차수열의 대칭성과 합의 구조',
      'Theme 3. 등차수열의 대칭성과 합의 구조',
      'Theme 1. 등차수열의 대칭성과 합의 구조',
      'Theme 2. 등차수열의 대칭성과 합의 구조',
      'Theme 3. 등차수열의 대칭성과 합의 구조',
      'Theme 1. 등차수열의 대칭성과 합의 구조',
      'Theme 2. 등차수열의 대칭성과 합의 구조',
      'Theme 3. 등차수열의 대칭성과 합의 구조',
    ],
    [
      'Theme 1. 등차수열의 대칭성과 합의 구조',
      'Theme 2. 등차수열의 대칭성과 합의 구조',
      'Theme 3. 등차수열의 대칭성과 합의 구조',
    ],
    [
      'Theme 1. 등차수열의 대칭성과 합의 구조',
      'Theme 2. 등차수열의 대칭성과 합의 구조',
      'Theme 3. 등차수열의 대칭성과 합의 구조',
    ],
  ]);

  const [deletedIndexArr, setDeletedIndexArr] = useState([]);
  console.log(orderedState);
  return (
    <div className="m-20">
      <OrderedList
        type="videoRegistered"
        order={1}
        orderedState={orderedState}
        setOrderedState={setOrderedState}
        deletedIndexArr={deletedIndexArr}
        setDeletedIndexArr={setDeletedIndexArr}
      />
      <OrderedList
        type="videoRegistered"
        order={1}
        orderedState={orderedState}
        setOrderedState={setOrderedState}
        deletedIndexArr={deletedIndexArr}
        setDeletedIndexArr={setDeletedIndexArr}
      />
    </div>
  );
}

export default App;
