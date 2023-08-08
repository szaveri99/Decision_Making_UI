import { useQuery } from 'react-query';
import './index.css';

import ShowQuestionsCMPT from './Components/ShowQuestions/ShowQuestionsCMPT';

function App() {
  const { isLoading, data } = useQuery(
    'base-data',
    async () => {
      const dataRequest = await fetch('http://localhost:5000/get-csv');
      const data = await dataRequest.json();
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data.length < 2) return;
  return (
    <>
      <ShowQuestionsCMPT questionDataState={data.slice(0,3)} />
    </>
  );
}

export default App;
