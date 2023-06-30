import React, { useEffect, useState } from 'react';
import QuestionCMPT from '../LoadQuestion';
import BtnCMPT from '../Button';
import ModalCMPT from '../Modal';

export default function ShowQuestionsCMPT({ questionDataState }) {
  const rangeStmt = [
    'True',
    'Mostly True',
    'Half True',
    'Mostly False',
    'Half False',
    'Pants on Fire',
  ];
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [questionState, setQuestionState] = useState(0);
  const currentQuestion = questionDataState[questionState].text;
  const [userResponses, setUserResponses] = useState(
    questionDataState.map((data) => ({
      statement: data.text,
      range: 0,
      rangeTxt: rangeStmt[0],
      text: 'N/A',
    }))
  );
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
    alert('Your Response Has submitted');
    setIsSubmit(false);
    setShowModal(false);
    setQuestionState(0);
    setUserResponses(
      questionDataState.map((data) => ({
        statement: data.text,
        range: 0,
        rangeTxt: rangeStmt[0],
        text: 'N/A',
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
          />
          <div id='btn-component'>
            <BtnCMPT
              buttonID={'previous-btn'}
              buttonName={'previous'}
              handleBtnClick={() =>
                setQuestionState((previousState) =>
                  Math.max(0, previousState - 1)
                )
              }
              shouldDisable={questionState === 0}
            />
            <BtnCMPT
              buttonID={'next-btn'}
              buttonName={'next'}
              handleBtnClick={() =>
                setQuestionState((previousState) =>
                  Math.min(questionDataState.length - 1, previousState + 1)
                )
              }
              shouldDisable={questionState === questionDataState.length - 1}
            />
            <BtnCMPT
              buttonID={'submit-btn'}
              buttonName={'submit'}
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
