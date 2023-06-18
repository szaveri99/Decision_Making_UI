import React, { useState } from 'react';

function InputCMPT({ originalTxt, handleInputChange, modifiedTxt }) {
  const [isSumbit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
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
          <input type='text' value={modifiedTxt} onChange={handleChange} />
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
