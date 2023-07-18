import React from 'react';

export default function ClassifierCMPT({ classifierValue }) {
  console.log(classifierValue)
  return (
    <>
      <div className='stmnt'>
        True{' '}
        <input
          type='range'
          step={1}
          min={0}
          max={1}
          className={classifierValue === 'True' ? 'green' : 'red'}
          defaultValue={classifierValue === 'True' ? 0 : 1}
          readOnly
        />{' '}
        False
        <div className='classifier-text'>Classifier Detection</div>
      </div>
    </>
  );
}
