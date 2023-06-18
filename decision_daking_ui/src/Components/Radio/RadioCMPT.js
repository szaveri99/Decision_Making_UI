import React from 'react';
import InputCMPT from '../MyInput';

function RadioCMPT({
  originalTxt,
  handleTick,
  tickState,
  handleInputChange,
  modifiedTxt,
}) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    handleTick(value === 'yes');
  };
  return (
    <div>
      <div>Do you want to make changes</div>
      <div>
        <label>
          <input
            type='radio'
            name='option'
            value={'yes'}
            onClick={handleRadioChange}
            checked={tickState}
          />
          yes
        </label>
        <label>
          <input
            type='radio'
            name='option'
            value={'no'}
            onClick={handleRadioChange}
            checked={!tickState}
          />
          no
        </label>
      </div>
      {tickState && (
        <InputCMPT
          originalTxt={originalTxt}
          handleInputChange={handleInputChange}
          modifiedTxt={modifiedTxt}
        />
      )}
    </div>
  );
}

export default RadioCMPT;
