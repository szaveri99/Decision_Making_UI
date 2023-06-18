import './Components/Button/index.css';
import QuestionCMPT from './Components/LoadQuestion/index.js';
import MyButton from './Components/Button/index.js';
import dummyData from './Dummy.js';
import { useState } from 'react';

function App() {
  const [questionState, setQuestionState] = useState(0);
  const currentQuestion = dummyData[questionState];
  return (
    <>
      <QuestionCMPT data={currentQuestion} />
      <div id='btn-component'>
        <MyButton
          buttonID={'previous-btn'}
          buttonName={'previous'}
          handleBtnClick={() =>
            setQuestionState((previousState) => (previousState -= 1))
          }
          shouldDisable={questionState === 0}
        />
        <MyButton
          buttonID={'next-btn'}
          buttonName={'next'}
          handleBtnClick={() =>
            setQuestionState((previousState) => (previousState += 1))
          }
          shouldDisable={questionState === dummyData.length - 1}
        />
        <MyButton
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
