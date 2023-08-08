import React, { useEffect, useState } from 'react';
import QuestionCMPT from '../LoadQuestion';
import BtnCMPT from '../Button';
import ModalCMPT from '../Modal';

export default function ShowQuestionsCMPT({ questionDataState }) {
  const rangeStmt = [
    'true',
    'mostly-true',
    'half-true',
    'barely-false',
    'false',
    'pants-on-fire',
  ];
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [questionState, setQuestionState] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const currentQuestion = questionDataState[questionState].text;
  const [userResponses, setUserResponses] = useState(
    questionDataState.map((data) => ({
      statement: data.text,
      range: 0,
      rangeTxt: rangeStmt[0],
      text: data.text,
      submittedStmt: [],
    }))
  );
  const [shouldHideClassifier, setShouldHideClassifier] = useState(true);

  const handleRangeChange = (index, newRangeValue) => {
    setUserResponses((prevState) => {
      const newResponses = [...prevState];
      newResponses[index].range = newRangeValue;
      newResponses[index].rangeTxt = rangeStmt[newRangeValue];
      return newResponses;
    });
  };

  const handleTextChange = (index, newTextValue) => {
    setUserResponses((prevState) => {
      const newResponses = [...prevState];
      newResponses[index].text = newTextValue;
      return newResponses;
    });
  };

  const handleSubmit = () => {
    console.log(userResponses);
    alert('Your Response Has submitted');
    setIsSubmit(false);
    setShowModal(false);
    setQuestionState(0);
    setUserResponses(
      questionDataState.map((data) => ({
        statement: data.text,
        range: 0,
        rangeTxt: rangeStmt[0],
        text: data.text,
        submittedStmt:[],
      }))
    );
  };

  useEffect(() => {}, [isSubmit]);

  return (
    <>
      {questionDataState.length > 1 && (
        <div>
          <QuestionCMPT
            data={currentQuestion}
            index={questionState}
            handleRangeChange={handleRangeChange}
            handleTextChange={handleTextChange}
            userResponse={userResponses[questionState]}
            setIsDisable={setIsDisable}
            currentIndex={questionState}
            shouldHideClassifier={shouldHideClassifier}
            setShouldHideClassifier={setShouldHideClassifier}
          />
          <div id='btn-component'>
            <BtnCMPT
              buttonID={'previous-btn'}
              buttonName={'↤  Previous'}
              handleBtnClick={() =>
                setQuestionState((previousState) =>
                  Math.max(0, previousState - 1)
                )
              }
              shouldDisable={questionState === 0}
            />
            <BtnCMPT
              buttonID={'next-btn'}
              buttonName={'Next  ↦'}
              handleBtnClick={() => {
                setQuestionState((previousState) =>
                  Math.min(questionDataState.length - 1, previousState + 1)
                );
                setShouldHideClassifier(true);
              }}
              shouldDisable={
                isDisable || questionState === questionDataState.length - 1
              }
            />
            <BtnCMPT
              buttonID={'submit-btn'}
              buttonName={'Submit'}
              shouldDisable={questionState !== questionDataState.length - 1}
              handleBtnClick={() => setShowModal(true)}
            />
          </div>
          <div id='page-number'>
            {questionState + 1}/{questionDataState.length}
          </div>
          {showModal && (
            <ModalCMPT
              showModal={showModal}
              userResponses={userResponses}
              setIsSubmit={setIsSubmit}
              setShowModal={setShowModal}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </>
  );
}
