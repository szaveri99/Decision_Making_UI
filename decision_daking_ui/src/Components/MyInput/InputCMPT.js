import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import BtnCMPT from '../Button';

function InputCMPT({ originalTxt, handleInputChange, modifiedTxt }) {
  const [isSumbit, setIsSubmit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [inputState, setInputState] = useState(
    modifiedTxt.trim() === 'N/A' ? originalTxt : modifiedTxt
  );

  useEffect(() => {
    Modal.setAppElement('#root'); // Set the app element
  }, []);

  console.log(inputState);
  console.log(originalTxt)
  console.log(inputState === originalTxt)
  const handleChange = (event) => {
    setInputState(event.target.value);
    handleInputChange(event.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (inputState.trim() !== '') {
      setShowConfirmation(true);
    }
    const dataRequest = await fetch('http://localhost:5000/fetch-data-for-classifier', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify({modified_txt:modifiedTxt})
    });
    setIsSubmit(modifiedTxt !== '');
    const response = await dataRequest.json(); // Parse the response as JSON
    const predictedClass = response; 
    console.log(predictedClass)
  };
  const handleClear = () => {
    setInputState('');
  };

  const handleConfirmationYes = () => {
    setDisplayText(modifiedTxt);
    setInputState(inputState);
    setShowConfirmation(false);
  };

  const handleConfirmationNo = () => {
    setInputState('');
    setDisplayText(modifiedTxt);
    setShowConfirmation(false);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' value={inputState} onChange={handleChange}/>
          <BtnCMPT
            buttonID={'submit-btn-text'}
            buttonName={'Submit'}
            handleBtnClick={handleSubmit}
            shouldDisable={inputState.trim() === originalTxt || inputState.trim() === ''}
          />
          <BtnCMPT
            buttonID={'clear-btn'}
            buttonName={'Clear'}
            handleBtnClick={handleClear}
            shouldDisable={false}
          />
        </form>
        <Modal
        isOpen={showConfirmation}
        onRequestClose={handleConfirmationNo}
        contentLabel="Confirmation Modal"
      >
        <h2>Confirmation</h2>
        <p>Do you want to rewrite the text?</p>
        <button onClick={handleConfirmationYes}>Yes</button>
        <button onClick={handleConfirmationNo}>No</button>
      </Modal>
      </div>
      {isSumbit && (
        <div>
          <p><b>Original text:</b> {originalTxt}</p>
          <p><b>Modified text:</b> {displayText}</p>
        </div>
      )}
    </>
  );
}

export default InputCMPT;
