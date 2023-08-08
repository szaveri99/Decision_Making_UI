import React from 'react';
import InputCMPT from '../MyInput';

function RadioCMPT({
  originalTxt,
  handleTick,
  tickState,
  handleInputChange,
  setIsDisable,
  userResponse,
  currentIndex,
  shouldHideClassifier,
  setShouldHideClassifier,
  classifierTxt,
  setClassifierTxt,
}) {
  const handleRadioChange = (event) => {
    const value = event.target.value
    handleTick(value === 'yes');
    setIsDisable(value === 'yes');
  };
  console.log(userResponse.rangeTxt);
  return (
    <div>
      <div className='stmnt'>
      Reveal what the classier predicts?
        {/* For Classifier to correctly predict, Do you want to make changes in the Statement? */}
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
          setIsDisable={setIsDisable}
          userResponse={userResponse}
          currentIndex={currentIndex}
          shouldHideClassifier={shouldHideClassifier}
          setShouldHideClassifier={setShouldHideClassifier}
          classifierTxt={classifierTxt}
          setClassifierTxt={setClassifierTxt}
          handleTick={handleTick}
        />
      )}
    </div>
  );
}

export default RadioCMPT;
