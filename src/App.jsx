import { useState } from 'react';
import OrderedList from './components/molecules/OrderedList';

function App() {
  const [orderedState, setOrderedState] = useState([
    'https://www.youtube.com/watch?v=....',
    'https://www.youtube.com/watch?v=....',
    'https://www.youtube.com/watch?v=....',
    'https://www.youtube.com/watch?v=....',
  ]);

  const [deletedIndexArr, setDeletedIndexArr] = useState([]);
  return (
    <div className="m-2">
      <OrderedList
        type="videoRegistration"
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
