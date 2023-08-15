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
  shouldHideClassifier,
  setShouldHideClassifier,
  classifierTxt,
  setClassifierTxt,
  handleTick,
}) {
  const [isSumbit, setIsSubmit] = useState(false);
  const [isOriginalTextSubmitted, setIsOriginalTextSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputState, setInputState] = useState(userResponse.text);
  const [stmtList, setStmtList] = useState([
    {
      originalTxt: userResponse.statement,
      modifiedTxt: userResponse.text,
    },
  ]);

  const [shouldHideForm, setShouldHideForm] = useState(false);
  const { mutate, isLoading, data } = useMutation(
    `base-user-response-${currentIndex}`,
    async () => {
      const newStmtObj = {};
      newStmtObj.originalTxt = stmtList.at(-1).modifiedTxt;
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
      // newStmtObj.originalTxtClassifier = response.originalTxtClassifier;
      // newStmtObj.modifiedTxtClassifier = response.modifiedTxtClassifier;

      setClassifierTxt(response);

      setStmtList((prevStmts) => [...prevStmts, newStmtObj]);

      userResponse.submittedStmt.push({
        stmt: newStmtObj,
        classifier: response,
        rangeVal: userResponse.rangeTxt,
      });
      setShouldHideClassifier(false);

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
    newStmtObj.originalTxt = stmtList.at(-1).modifiedTxt;
    newStmtObj.modifiedTxt = inputState;

    const response = {};
    response.originalTxtClassifier = "true";
    response.modifiedTxtClassifier = "false";

    setStmtList((prevStmts) => [...prevStmts, newStmtObj]);
    setClassifierTxt(response);
    userResponse.submittedStmt.push({
      stmt: newStmtObj,
      classifier: response,
      rangeVal: userResponse.rangeTxt,
    });
    setTimeout((e) => {
      console.log('from line 97',e);
      setShouldHideClassifier(false);
    },1000)
  };

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
    // newMutate();
    mutate();
    // newMutate() uncomment this and comment mutate call if want to test
  };
  const handleClear = () => {
    setInputState('');
  };

  const handleConfirmationYes = () => {
    setInputState(inputState);
    setShowConfirmation(false);
    setIsDisable(true);
    setShouldHideClassifier(true);
  };

  const handleConfirmationNo = () => {
    setInputState('');
    setShowConfirmation(false);
    setIsDisable(false);  // change for the no button to function properly intially it was true turned to false for next button disability
    setShouldHideForm(true);
    handleTick(false);
    setShouldHideClassifier(true);
    userResponse.text = userResponse.statement;
  };
  console.log('classifier Text', classifierTxt);
  const recentStmt = stmtList.at(-1);
  console.log('stmt', stmtList.at(-1));
  console.log(shouldHideClassifier);
  return (
    <>
      <div>
        {shouldHideForm === false && (
          <form onSubmit={handleSubmit}>
            <label className='stmnt-inp-text'>
              First test the classifier accuracy on original statement. Then, rewrite the provided statements in such a way 
              that the semantic meaning is the same as the original one, but you are trying to fool a classifier (i.e., change the classification score from "false" to "true" or vice-versa)
            </label>
            <br />
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
          {shouldHideClassifier === false && classifierTxt !== null ? (
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
              {/* <p>
                <b>Original Txt:</b>
                {recentStmt.originalTxt}{' '}
                <b>{`${classifierTxt?.originalTxtClassifier}`}</b>
              </p>
              <p>
                <b>Modified Txt:</b>
                {recentStmt.modifiedTxt}{' '}
                <b>{`${classifierTxt?.modifiedTxtClassifier}`}</b>
              </p> */}
              <p>The original rating given by the user initially given as{' '}
                 <b>{userResponse?.rangeTxt}.</b>
              </p>
              <p>
              The original classification score for <b>{recentStmt.originalTxt}</b>{' '} 
              the classifier was <b>{`${classifierTxt?.originalTxtClassifier}`}</b>,{' '}
              after your writing, the new classification score is <b>{`${classifierTxt?.modifiedTxtClassifier}`}</b>.
              </p>
              {/* <p><b><i>
                If you're satisfied with your edits, click "Continue" and then select the "No" option to proceed to the next statement.
                </i></b></p> */}
              <p><b><i>
                Are you satisfied with your work? Do you want to re-write the
                statement?
                </i></b></p>
              <button onClick={handleConfirmationYes}>Yes</button>
              <button onClick={handleConfirmationNo}>No</button>
            </>
          ) : (
            <div className='load'>
              The classifier is predicting the class for the statement, <br />
              <b>Please Hold On...</b>
            </div>
          )}
        </Modal>
      </div>
      {isSumbit &&
        stmtList.length > 1 &&
        stmtList.slice(1).map((eachStmt, indexKey) => (
          <div className='stmnt-text' key={indexKey}>
            <p>
              <b className='stmnt'>Original Text:</b> {eachStmt.originalTxt} {' '}
            </p>
            <p><b className='stmnt'>Result of Previous Text Classification: </b>{`${classifierTxt?.originalTxtClassifier}`}</p>
            <p>
              <b className='stmnt'>Modified Text:</b> {eachStmt.modifiedTxt} {' '}
            </p>
            <p><b className='stmnt'>Result of Modified Text Classification: </b>{`${classifierTxt?.modifiedTxtClassifier}`}</p>
          </div>
        ))}
    </>
  );
}

export default InputCMPT;
