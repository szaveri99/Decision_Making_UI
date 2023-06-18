import React from 'react';
import InstructionsCMPT from '../Instructions/index.js';
import StmtCMPT from '../Stmt/index.js';
import RangeCMPT from '../Range/index.js';
import RadioCMPT from '../Radio/index.js';

function QuestionCMPT({data}) {
  const currentInstructions = 'Please follow propper guide lines';

  return (
    <>
      <InstructionsCMPT insText={currentInstructions} />
      <StmtCMPT txt={data} />
      <RangeCMPT />
      <RadioCMPT originalTxt={data} />
    </>
  );
}

export default QuestionCMPT;
