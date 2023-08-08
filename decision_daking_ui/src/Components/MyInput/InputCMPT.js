import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import BtnCMPT from '../Button';
import { useMutation } from 'react-query';

function InputCMPT({
  originalTxt,
  handleInputChange,
  setIsDisable,
  userResponse,
  currentIndex,
  setShouldHideClassifier,
  classifierTxt,
  setClassifierTxt,
  handleTick,
}) {
  const [isSumbit, setIsSubmit] = useState(false);
  const [isOriginalTextSubmitted, setIsOriginalTextSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputState, setInputState] = useState(userResponse.text);
  const [stmtList, setStmtList] = useState([{
    originalTxt: userResponse.statement,
    modifiedTxt: userResponse.text
  }]);

  const [shouldHideForm, setShouldHideForm] = useState(false);
  const { mutate, isLoading, data } = useMutation(
    `base-user-response-${currentIndex}`,
    async () => {
      const newStmtObj = {};
      newStmtObj.originalTxt = (stmtList.at(-1)).modifiedTxt;
      newStmtObj.modifiedTxt = inputState;

      const dataRequest = await fetch(
        'http://localhost:5000/fetch-data-for-classifier',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            original_txt: newStmtObj.originalTxt,
            modified_txt: newStmtObj.modifiedTxt,
          }),
        }
      );
      setIsSubmit(true);
      const response = await dataRequest.json();
      newStmtObj.originalTxtClassifier = response.originalTxtClassifier;
      newStmtObj.modifiedTxtClassifier = response.modifiedTxtClassifier;

      setClassifierTxt(response);

      setStmtList(prevStmts => [...prevStmts, newStmtObj])
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

  const newMutate = () => {
    setIsSubmit(true);
    const newStmtObj = {};
    newStmtObj.originalTxt = (stmtList.at(-1)).modifiedTxt;
    newStmtObj.modifiedTxt = inputState;

    const response = {};
    response.originalTxtClassifier = true;
    response.modifiedTxtClassifier = false;
    
    setStmtList(prevStmts => [...prevStmts, newStmtObj])
    setClassifierTxt(response);
  }

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
    newMutate();
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
    setIsDisable(true);
    setShouldHideForm(true);
    handleTick(false);
    userResponse.text = userResponse.statement;
  };
  console.log('classifier Text', classifierTxt);
  const recentStmt = stmtList.at(-1);
  console.log('stmt', stmtList.at(-1));
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
          {isLoading && classifierTxt !== null ? (
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
              {/* <p>
                For the <b>{inputState}</b> the original classification score given by you was {' '}
                <b>{userResponse.rangeTxt}</b> after your writing, the new classification score is {' '}
                <b>{`${data}`}</b>
                {rangeStatement}.
              </p> */}
              <p><b>Original Txt:</b>{recentStmt.originalTxt} <b>{`${classifierTxt?.originalTxtClassifier}`}</b></p>
              <p><b>Modified Txt:</b>{recentStmt.modifiedTxt} <b>{`${classifierTxt?.modifiedTxtClassifier}`}</b></p>
              <p>Are you satisfied with your work? Do you want to re-write the statement?</p>
              <button onClick={handleConfirmationYes}>Yes</button>
              <button onClick={handleConfirmationNo}>No</button>
            </>
          )}
        </Modal>
      </div>
      {isSumbit && stmtList.length > 1 && (stmtList.slice(1).map((eachStmt, indexKey) => (
        <div className='stmnt-text' key={indexKey}>
          <p>
            <b className='stmnt'>Original Text:</b> {eachStmt.originalTxt}. <b>{`${classifierTxt?.originalTxtClassifier}`}</b>
          </p>
          <p>
            <b className='stmnt'>Modified Text:</b> {eachStmt.modifiedTxt}. <b>{`${classifierTxt?.modifiedTxtClassifier}`}</b>
          </p>
        </div>
      )))}
    </>
  );
}

export default InputCMPT;
