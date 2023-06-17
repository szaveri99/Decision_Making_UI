import React from 'react';

function index() {
  return (
    <div>
      <div>Do you want to make changes</div>
      <div>
        <input type='radio' name='option' value={'yes'} /> yes
        <input type='radio' name='option' defaultChecked value={'no'} /> no
      </div>
    </div>
  );
}

export default index;
