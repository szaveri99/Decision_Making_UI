import React, { useEffect, useState } from 'react';
import InstructionsCMPT from '../Instructions';
import StmtCMPT from '../Stmt';
import RangeCMPT from '../Range';
import RadioCMPT from '../Radio';

function QuestionCMPT({ data }) {
  const [tickState, setTickState] = useState(false);
  const [modifiedTxt, setModifiedTxt] = useState('');
  const handleTick = (value) => {
    setTickState(value);
  };
  const handleInputChange = (value) => {
    setModifiedTxt(value);
  };
  const currentInstructions = 'Please follow propper guide lines';
  useEffect(() => {
    console.log('run');
    setTickState(false);
    setModifiedTxt('');
  }, [data]);
  return (
    <>
      <InstructionsCMPT insText={currentInstructions} />
      <StmtCMPT txt={data} />
      <RangeCMPT />
      <RadioCMPT
        originalTxt={data}
        handleTick={handleTick}
        tickState={tickState}
        handleInputChange={handleInputChange}
        modifiedTxt={modifiedTxt}
      />
    </>
  );
}

export default QuestionCMPT;
