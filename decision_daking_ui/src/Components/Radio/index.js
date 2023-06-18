import React, { useState } from 'react';
import InputCMPT from '../MyInput';

function RadioCMPT({originalTxt}) {
  const [tickState, setTickState] = useState(false);
  const handleTick = (event) => {
    const value = event.target.value;
    if (value === 'yes') {
      setTickState(true);
    } else {
      setTickState(false);
    }
  };
  return (
    <div>
      <div>Do you want to make changes</div>
      <div>
        <input type='radio' name='option' value={'yes'} onClick={handleTick} />{' '}
        yes
        <input
          type='radio'
          name='option'
          defaultChecked
          value={'no'}
          onClick={handleTick}
        />{' '}
        no
      </div>
      {tickState && <InputCMPT originalTxt={originalTxt}/>}
    </div>
  );
}

export default RadioCMPT;
