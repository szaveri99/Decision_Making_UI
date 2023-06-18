import './index.css';
import QuestionCMPT from './Components/LoadQuestion';
import BtnCMPT from './Components/Button';
import dummyData from './Dummy.js';
import { useEffect, useState } from 'react';

function App() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [questionState, setQuestionState] = useState(0);
  const currentQuestion = dummyData[questionState];
  const [userResponses, setUserResponses] = useState(
    dummyData.map((data) => ({ statement: data, range: 0, text: '' }))
  );
  const handleRangeChange = (index, newRangeValue) => {
    setUserResponses((prevState) => {
      const newResponses = [...prevState];
      newResponses[index].range = newRangeValue;
      return newResponses;
    });
  };

  const handleTextChange = (index, newTextValue) => {
    setUserResponses((prevState) => {
      const newResponses = [...prevState];
      newResponses[index].text = newTextValue;
      return newResponses;
    });
  };

  useEffect(() => {
    console.log(userResponses);
  }, [isSubmit]);

  return (
    <>
      <QuestionCMPT
        data={currentQuestion}
        index={questionState}
        handleRangeChange={handleRangeChange}
        handleTextChange={handleTextChange}
        userResponse={userResponses[questionState]}
      />
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
          handleBtnClick={() => setIsSubmit(true)}
        />
      </div>
      <div id='page-number'>
        {questionState + 1}/{dummyData.length}
      </div>
    </>
  );
}

export default App;
