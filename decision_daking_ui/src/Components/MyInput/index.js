import React, { useState } from 'react';

function InputCMPT({ originalTxt }) {
  const [submitState, setSubmitState] = useState(false);
  const [modifiedTxt, setModifiedTxt] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitState(true);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={(event) => setModifiedTxt(event.target.value)}
          />
          <input type='submit' value={'submit'} />
        </form>
      </div>
      {submitState && (
        <div>
          <p>original text: {originalTxt}</p>
          <p>modified text: {modifiedTxt}</p>
        </div>
      )}
    </>
  );
}

export default InputCMPT;
