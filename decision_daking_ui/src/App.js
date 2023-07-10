import { useEffect, useState } from 'react';
import './index.css';
import Papa from 'papaparse';
import React from 'react';
import ShowQuestionsCMPT from './Components/ShowQuestions/ShowQuestionsCMPT';

function App() {
  const [questionDataState, setquestionDataState] = useState([{}]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('./decision_daking_backend/politifact_subset_data.csv'); // Replace with the actual path to your CSV file
        const csvData = await response.text();
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            const parsedData = results.data;
            setquestionDataState(parsedData);
          },
          error: (error) => {
            console.error('Error parsing CSV data:', error);
          }
        });
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
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
