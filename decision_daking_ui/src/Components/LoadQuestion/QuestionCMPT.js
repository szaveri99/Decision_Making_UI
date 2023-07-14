import React, { useEffect, useState } from 'react';
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
}) {
  const [tickState, setTickState] = useState(false);
  const currentInstructions = "To use this application, follow these steps:. 1)Start by consider the following range from True to False to interpret the statement.2)Enter the text in the provided input field to see the results that is provided by the classifier. 3)Click the Submit button to send the text to the server for classification. 4)Wait for the response to see the predicted class. Please keep in mind the following:. 1) Make sure you enter valid text that you want to classify, this will ensure accurate results. 2) Avoid submitting empty or irrelevant text, as it may affect the classification accuracy.";
  const txt = currentInstructions.split('.').map(str => <p>{str}</p>)
  
  useEffect(() => {
    setTickState(false);
  }, [data]);
  return (
    <>
      <InstructionsCMPT insText={txt} />
      <StmtCMPT txt={data} />
      <RangeCMPT
        rangeValue={userResponse.range}
        handleRangeChange={handleRangeChange}
        index={index}
      />
      <RadioCMPT
        originalTxt={data}
        handleTick={setTickState}
        tickState={tickState}
        handleInputChange={(newTextValue) =>
          handleTextChange(index, newTextValue)
        }
        userText={userResponse.text}
      />
    </>
  );
}

export default QuestionCMPT;
