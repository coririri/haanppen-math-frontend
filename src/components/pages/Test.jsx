import React from 'react';
import Pagenation from '../organisms/Pagenation';

function Test() {
  return (
    <div className="w-full">
      <Pagenation totalItemNumbers={204} size={5} />
    </div>
  );
}

export default Test;
