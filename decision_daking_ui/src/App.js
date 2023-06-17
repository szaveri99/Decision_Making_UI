import './Components/Button/index.css';
import MyQuestion from './Components/LoadQuestion/index.js';
import MyButton from './Components/Button/index.js';

function App() {
  return (
    <>
      <MyQuestion />
      <div id='btn-component'>
        <MyButton buttonID={'previous-btn'} buttonName={'previous'} />
        <MyButton buttonID={'next-btn'} buttonName={'next'} />
        <MyButton buttonID={'submit-btn'} buttonName={'submit'} />
      </div>
      <div id='page-number'>1/7</div>
    </>
  );
}

export default App;
