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
  const currentInstructions = 'Please follow propper guide lines';
  useEffect(() => {
    setTickState(false);
  }, [data]);
  return (
    <>
      <InstructionsCMPT insText={currentInstructions} />
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
