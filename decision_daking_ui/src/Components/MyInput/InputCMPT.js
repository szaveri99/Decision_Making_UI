import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import BtnCMPT from '../Button';

function InputCMPT({
  originalTxt,
  handleInputChange,
  modifiedTxt,
  setIsDisable,
  rangeStatement,
  userResponse,
  setClassifierValue,
  classifierValue,
}) {
  const [isSumbit, setIsSubmit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [inputState, setInputState] = useState(
    modifiedTxt.trim() === 'N/A' ? originalTxt : modifiedTxt
  );
  const [shouldHideForm, setShouldHideForm] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root'); // Set the app element
  }, []);

  const handleChange = (event) => {
    setInputState(event.target.value);
    handleInputChange(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputState.trim() !== '') {
      setShowConfirmation(true);
    }
    // const dataRequest = await fetch(
    //   'http://localhost:5000/fetch-data-for-classifier',
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({ modified_txt: modifiedTxt }),
    //   }
    // );
    setIsSubmit(modifiedTxt !== '');
    // const response = await dataRequest.json(); // Parse the response as JSON
    // const predictedClass = response;
    // console.log(predictedClass);
    setClassifierValue(true);
  };
  const handleClear = () => {
    setInputState('');
  };

  const handleConfirmationYes = () => {
    setDisplayText(modifiedTxt);
    setInputState(inputState);
    setShowConfirmation(false);
    setIsDisable(true);
  };

  const handleConfirmationNo = () => {
    setInputState('');
    setDisplayText(modifiedTxt);
    setShowConfirmation(false);
    setIsDisable(false);
    setShouldHideForm(true);
  };
  return (
    <>
      <div>
        {shouldHideForm === false && (
          <form onSubmit={handleSubmit}>
            <input type='text' value={inputState} onChange={handleChange} />
            <BtnCMPT
              buttonID={'submit-btn-text'}
              buttonName={'Submit'}
              handleBtnClick={handleSubmit}
              shouldDisable={
                inputState.trim() === originalTxt || inputState.trim() === ''
              }
              myStyle={{backgroundColor:(inputState.trim() === originalTxt || inputState.trim() === '') ? '' : 'green'}}
            />
            <BtnCMPT
              buttonID={'clear-btn'}
              buttonName={'Clear'}
              handleBtnClick={handleClear}
              shouldDisable={false}
            />
          </form>
        )}
        <Modal
          isOpen={showConfirmation}
          onRequestClose={handleConfirmationNo}
          contentLabel='Confirmation Modal'
        >
          <h2>Confirmation</h2>
          <p>
            for the <b>{inputState}.</b> the classifier shows{' '}
            <b>{`${classifierValue}`}</b> but the user selected the statement as{' '}
            <b>{userResponse.rangeTxt}</b>
            {rangeStatement}.
          </p>
          <p>Do you want to rewrite the text?</p>
          <button onClick={handleConfirmationYes}>Yes</button>
          <button onClick={handleConfirmationNo}>No</button>
        </Modal>
      </div>
      {isSumbit && (
        <div>
          <p>
            <b>Original text:</b> {originalTxt}
          </p>
          <p>
            <b>Modified text:</b> {displayText}
          </p>
        </div>
      )}
    </>
  );
}

export default InputCMPT;
