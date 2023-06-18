import './index.css'
import QuestionCMPT from './Components/LoadQuestion';
import BtnCMPT from './Components/Button';
import dummyData from './Dummy.js';
import { useState } from 'react';

function App() {
  const [questionState, setQuestionState] = useState(0);
  const currentQuestion = dummyData[questionState];
  return (
    <>
      <QuestionCMPT data={currentQuestion} />
      <div id='btn-component'>
        <BtnCMPT
          buttonID={'previous-btn'}
          buttonName={'previous'}
          handleBtnClick={() =>
            setQuestionState((previousState) => Math.max(0, previousState - 1))
          }
          shouldDisable={questionState === 0}
        />
        <BtnCMPT
          buttonID={'next-btn'}
          buttonName={'next'}
          handleBtnClick={() =>
            setQuestionState((previousState) =>
              Math.min(dummyData.length - 1, previousState + 1)
            )
          }
          shouldDisable={questionState === dummyData.length - 1}
        />
        <BtnCMPT
          buttonID={'submit-btn'}
          buttonName={'submit'}
          shouldDisable={questionState !== dummyData.length - 1}
          handleBtnClick={() => {
            console.log('congratulations');
          }}
        />
      </div>
      <div id='page-number'>
        {questionState + 1}/{dummyData.length}
      </div>
    </>
  );
}

export default App;
