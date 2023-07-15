import React from 'react';
import InputCMPT from '../MyInput';

function RadioCMPT({
  originalTxt,
  handleTick,
  tickState,
  handleInputChange,
  userText,
  setIsDisable,
  rangeStatement,
  userResponse,
  setClassifierValue,
  classifierValue,
}) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    handleTick(value === 'yes');
    setIsDisable(value === 'yes');
  };
  return (
    <div>
      <div>
        Do you want to make changes in the Statement for AI to correctly predict
        the statement ?
      </div>
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
          modifiedTxt={userText}
          setIsDisable={setIsDisable}
          rangeStatement={rangeStatement}
          userResponse={userResponse}
          setClassifierValue={setClassifierValue}
          classifierValue={classifierValue}
        />
      )}
    </div>
  );
}

export default RadioCMPT;
