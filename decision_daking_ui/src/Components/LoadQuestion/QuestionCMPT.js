import React, { useEffect, useRef, useState } from 'react';
import InstructionsCMPT from '../Instructions';
import ClassifierCMPT from '../Classifier';
import StmtCMPT from '../Stmt';
import RangeCMPT from '../Range';
import RadioCMPT from '../Radio';

function QuestionCMPT({
  data,
  index,
  handleRangeChange,
  handleTextChange,
  userResponse,
  setIsDisable,
  currentIndex,
  shouldHideClassifier,
  setShouldHideClassifier,
}) {
  const [tickState, setTickState] = useState(false);
  const currentInstructions =
    '<b>To use this application, follow these steps: <b/>. <i>1)Start by consider the following range from <b>True</b> to <b>False</b> to interpret the statement<i/>.<i>2)Enter the text in the provided input field to see the results that is provided by the classifier<i/>. <i>3)Click the Submit button to send the text to the server for classification<i/>. <i>4)Wait for the response to see the predicted class<i/>. <b>Please keep in mind the following:</b>.<i> 1) Make sure you enter valid text that you want to classify, this will ensure accurate results<i/>. <i>2) Avoid submitting empty or irrelevant text, as it may affect the classification accuracy <i/>';
  const txt = currentInstructions;
  const [classifierTxt, setClassifierTxt] = useState(null);

  useEffect(() => {
    setTickState(false);
  }, [data]);
  return (
    <>
      <InstructionsCMPT insText={txt} />
      <b className='stmnt'>Please, read the following statement and assess its veracity score on this given scale</b>
      <i className='stmnt-text'>
        <StmtCMPT txt={data} />
      </i>
      <div className='range-div stmnt'>
        <RangeCMPT
          rangeValue={userResponse.range}
          handleRangeChange={handleRangeChange}
          index={index}
        />
        {shouldHideClassifier === false && (
          <ClassifierCMPT classifierValue={classifierTxt} />
        )}
      </div>
      <RadioCMPT
        originalTxt={data}
        handleTick={setTickState}
        tickState={tickState}
        handleInputChange={(newTextValue) =>
          handleTextChange(index, newTextValue)
        }
        userText={userResponse.text}
        setIsDisable={setIsDisable}
        userResponse={userResponse}
        currentIndex={currentIndex}
        setShouldHideClassifier={setShouldHideClassifier}
        setClassifierTxt={setClassifierTxt}
      />
    </>
  );
}

export default QuestionCMPT;
