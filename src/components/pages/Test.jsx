import React, { useState } from 'react';
import Pagenation from '../organisms/Pagenation';

function Test() {
  const [page, setPage] = useState(1);
  return (
    <div className="w-full">
      <Pagenation
        totalItemNumbers={204}
        size={5}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default Test;
