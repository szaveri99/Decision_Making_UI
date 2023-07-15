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
    '1)Start by consider the following range from <b>True</b> to <b>False</b> to interpret the statement.2)Enter the text in the provided input field to see the results that is provided by the classifier. 3)Click the Submit button to send the text to the server for classification. 4)Wait for the response to see the predicted class. Please keep in mind the following:. 1) Make sure you enter valid text that you want to classify, this will ensure accurate results. 2) Avoid submitting empty or irrelevant text, as it may affect the classification accuracy';
  const txt = currentInstructions;
  const [classifierValue, setClassifierValue] = useState(null);
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
      <StmtCMPT txt={data} />
      <div>
        <RangeCMPT
          rangeValue={userResponse.range}
          handleRangeChange={handleRangeChange}
          index={index}
        />
        {classifierValue !== null && (
          <div>
            True{' '}
            <input type='range' step={1} min={0} max={1} ref={classifierRef} />{' '}
            False
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
