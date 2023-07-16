import React, { useEffect, useRef, useState } from 'react';
import InstructionsCMPT from '../Instructions';
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
}) {
  const classifierRef = useRef(null);
  const [tickState, setTickState] = useState(false);
  const currentInstructions =
    '<b>To use this application, follow these steps: <b/>. <i>1)Start by consider the following range from <b>True</b> to <b>False</b> to interpret the statement<i/>.<i>2)Enter the text in the provided input field to see the results that is provided by the classifier<i/>. <i>3)Click the Submit button to send the text to the server for classification<i/>. <i>4)Wait for the response to see the predicted class<i/>. <b>Please keep in mind the following:</b>.<i> 1) Make sure you enter valid text that you want to classify, this will ensure accurate results<i/>. <i>2) Avoid submitting empty or irrelevant text, as it may affect the classification accuracy <i/>';
  const txt = currentInstructions;
  const [classifierValue, setClassifierValue] = useState(null);
  console.log('classifierRef:', classifierRef)
  console.log('classifierCurrent:',classifierRef.current)
  if (classifierRef.current) {
    classifierRef.current.value = classifierValue === true ? 0 : 1;
    console.log(classifierRef.current);
    classifierRef.current.className =
      classifierValue === true ? 'green' : 'red';
  }

  useEffect(() => {
    setTickState(false);
  }, [data]);
  return (
    <>
      <InstructionsCMPT insText={txt} />
      <b className='stmnt'>Statement:</b><i className='stmnt-text'><StmtCMPT txt={data} /></i>
      <div className='range-div stmnt'>
        <RangeCMPT
          rangeValue={userResponse.range}
          handleRangeChange={handleRangeChange}
          index={index}
        /> 
        {classifierValue !== null && (
          <div className='stmnt'>
            True{' '}
            <input type='range' step={1} min={0} max={1} ref={classifierRef} /> {' '}
            False
            <div className='classifier-text'>Classifier Detection</div>
          </div>
          
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
        setClassifierValue={setClassifierValue}
        classifierValue={classifierValue}
      />
    </>
  );
}

export default QuestionCMPT;
