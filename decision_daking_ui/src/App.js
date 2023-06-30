import { useEffect, useState } from 'react';
import './index.css';

import ShowQuestionsCMPT from './Components/ShowQuestions/ShowQuestionsCMPT';

function App() {
  const [questionDataState, setquestionDataState] = useState([{}]);
  useEffect(() => {
    const getData = async () => {
      const dataRequest = await fetch('http://localhost:5000/get-csv');
      const data = await dataRequest.json();
      setquestionDataState(data.slice(0,3));
    };
    getData();
  }, []);
  if (questionDataState.length < 2) return;
  return (
    <>
      <ShowQuestionsCMPT questionDataState={questionDataState} />
    </>
  );
}

export default App;
