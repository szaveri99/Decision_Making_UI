import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import BtnCMPT from '../Button';
import { useMutation } from 'react-query';

function InputCMPT({
  originalTxt,
  handleInputChange,
  modifiedTxt,
  setIsDisable,
  rangeStatement,
  userResponse,
  currentIndex,
  setShouldHideClassifier,
  setClassifierTxt,
  handleTextChangeSubmit,
}) {
  const [isSumbit, setIsSubmit] = useState(false);
  const [isOriginalTextSubmitted, setIsOriginalTextSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [inputState, setInputState] = useState(modifiedTxt);

  const [shouldHideForm, setShouldHideForm] = useState(false);
  const { mutate, isLoading, data } = useMutation(
    `base-user-response-${currentIndex}`,
    async () => {
      const dataRequest = await fetch(
        'http://localhost:5000/fetch-data-for-classifier',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            modified_txt: !isOriginalTextSubmitted ? originalTxt : modifiedTxt,
          }),
        }
      );
      setIsSubmit(true);
      const response = await dataRequest.json();
      setClassifierTxt(response);
      return response;
    },
    {
      _defaulted: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

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
      if (inputState.trim() === originalTxt) {
        setIsOriginalTextSubmitted(true); // Enable the submit button for the first time
      } else {
        setIsOriginalTextSubmitted(false); // Disable the submit button for subsequent times
      }
    }
    setIsSubmit(true);
    setShouldHideClassifier(false);
    console.log('line 74 input state', modifiedTxt, inputState)
    handleTextChangeSubmit(displayText || originalTxt, inputState);
    setDisplayText(modifiedTxt);
    // mutate();
  };
  const handleClear = () => {
    setInputState('');
  };

  const handleConfirmationYes = () => {
    setInputState(inputState);
    setShowConfirmation(false);
    setIsDisable(true);
  };

  const handleConfirmationNo = () => {
    setInputState('');
    setShowConfirmation(false);
    setIsDisable(false);
    setShouldHideForm(true);
  };

  console.log(isSumbit);
  console.log(isOriginalTextSubmitted);
  return (
    <>
      <div>
        {shouldHideForm === false && (
          <form onSubmit={handleSubmit}>
            <label className='stmnt-inp-text'>
              First test the classifier accuracy on original statement. Then, rewrite with same meaning to mislead classifier.
            </label>
            <br/>
            <input type='text' value={inputState} onChange={handleChange} />
            <BtnCMPT
              buttonID={'submit-btn-text'}
              buttonName={'Submit'}
              handleBtnClick={handleSubmit}
              shouldDisable={
                // inputState.trim() === originalTxt || inputState.trim() === ''
                isSumbit &&
                isOriginalTextSubmitted &&
                inputState.trim() === originalTxt
              }
              myStyle={{
                backgroundColor:
                  !(isSumbit && isOriginalTextSubmitted) &&
                  inputState.trim() === originalTxt
                    ? '#2ecc71'
                    : inputState.trim() === originalTxt ||
                      inputState.trim() === ''
                    ? ''
                    : '#2ecc71',
              }}
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
          className='confirmation-modal'
        >
          {isLoading ? (
            <div className='load'>The classifier is predicting the class for the statement, <br/><b>Please Hold On...</b></div>
          ) : (
            <>
              <h2>Confirmation</h2>
              {/* <p>
                For the <b>{inputState}</b> the Classifier shows{' '}
                <b>{`${data}`}</b> and the user prefer the statement as{' '}
                <b>{userResponse.rangeTxt}</b>
                {rangeStatement}.
              </p> */}
              <p>
                For the <b>{inputState}</b> the original classification score given by you was {' '}
                <b>{userResponse.rangeTxt}</b> after your writing, the new classification score is {' '}
                <b>{`${data}`}</b>
                {rangeStatement}.
              </p>

              <p>Are you satisfied with your work? Do you want to re-write the statement?</p>
              <button onClick={handleConfirmationYes}>Yes</button>
              <button onClick={handleConfirmationNo}>No</button>
            </>
          )}
        </Modal>
      </div>
      {isSumbit && (
        <div className='stmnt-text'>
          <p>
            <b className='stmnt'>Original Text:</b> {userResponse.tempText}
          </p>
          <p>
            <b className='stmnt'>Modified Text:</b> {displayText}
          </p>
        </div>
      )}
    </>
  );
}

export default InputCMPT;
