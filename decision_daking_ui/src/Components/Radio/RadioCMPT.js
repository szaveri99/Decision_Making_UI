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
      <div className='stmnt'>
        For Classifier to correctly predict, Do you want to make changes in
        the Statement ?
      </div>
      <div className='stmnt-text'>
        <label>
          <input
            type='radio'
            name='option'
            value={'yes'}
            onClick={handleRadioChange}
            checked={tickState}
          />
          Yes
        </label>
        <label>
          <input
            type='radio'
            name='option'
            value={'no'}
            onClick={handleRadioChange}
            checked={!tickState}
          />
          No
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
