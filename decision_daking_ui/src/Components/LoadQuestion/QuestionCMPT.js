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
  setIsDisable,
  currentIndex,
  shouldHideClassifier,
  setShouldHideClassifier,
}) {
  const [tickState, setTickState] = useState(false);
  const currentInstructions =
    '<b>To use this application, follow these steps: <b/>. <i>1) The user will be first analysing the statement and rating the statement on 6 likert scale ranging from <b>True<b/> to <b>False<b/><i/>.<i>2) The text input will intiallly show the original text and afterwards the user will get the chance to modified the text and try to fool the classifier<i/>.<i>3)The text input will intially show the original text and afterwards the user will get the chance to modify the text and try to fool the classifier<i/>. <i>4) Wait for the response to see the predicted class<i/> .<i>5) Click on yes if you didn\'t like the modified text prediction and continue with the modification of text, if not, then click No <i/>. <i>6) The Next Button of main dashboard will be disabled unless the radio button is changed to No, then, To go to next statement change the radio button option to No then click on Next<i/>. <i>7) Continue the process untill you reach to end<i/>. <b>Please keep in mind the following:</b>.<i> 1) Make sure you enter valid text that you want to classify, this will ensure accurate results<i/>. <i>2) Avoid submitting empty or irrelevant text, as it may affect the classification accuracy <i/>';
  const txt = currentInstructions;
  const [classifierTxt, setClassifierTxt] = useState(null);
  
  console.log("userResponse : ",userResponse)
  console.log("userResponse.predictor : ",userResponse.predictor)
  console.log("Type of userResponse.predictor:", typeof userResponse.predictor);
  
  useEffect(() => {
    setTickState(false);
  }, [data]);
  return (
    <>
      <InstructionsCMPT insText={txt} />
      <b className='stmnt'>Please, read the following statement and assess its veracity score on this given scale</b>
      <div className='range-classifier'>
      <i className='stmnt-text'>
        <StmtCMPT txt={data} />
      </i>
      <div className='classifier-text'>
          The Classifier predicts the statement as{' '}
          <i className='stmnt'>{userResponse.predictor ? 'True' : 'False'}</i>
        </div>
        </div>
      <div className='range-div stmnt'>
        <RangeCMPT
          rangeValue={userResponse.range}
          handleRangeChange={handleRangeChange}
          index={index}
        />
        </div>
      
      <RadioCMPT
        originalTxt={data}
        handleTick={setTickState}
        tickState={tickState}
        handleInputChange={(newTextValue) =>
          handleTextChange(index, newTextValue)
        }
        setIsDisable={setIsDisable}
        userResponse={userResponse}
        currentIndex={currentIndex}
        shouldHideClassifier={shouldHideClassifier}
        setShouldHideClassifier={setShouldHideClassifier}
        classifierTxt={classifierTxt}
        setClassifierTxt={setClassifierTxt}
      />
    </>
  );
}

export default QuestionCMPT;
