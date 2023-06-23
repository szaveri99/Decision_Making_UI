import React, { useState } from 'react';

function InputCMPT({ originalTxt, handleInputChange, modifiedTxt }) {
  const [isSumbit, setIsSubmit] = useState(false);
  const [inputState, setInputState] = useState(
    modifiedTxt.trim() === 'N/A' ? originalTxt : modifiedTxt
  );
  console.log(inputState);
  const handleChange = (event) => {
    setInputState(event.target.value);
    handleInputChange(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(modifiedTxt !== '');
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' value={inputState} onChange={handleChange} />
          <input type='submit' value={'submit'} />
        </form>
      </div>
      {isSumbit && (
        <div>
          <p>original text: {originalTxt}</p>
          <p>modified text: {modifiedTxt}</p>
        </div>
      )}
    </>
  );
}

export default InputCMPT;
