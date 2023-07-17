import React from 'react';

export default function ClassifierCMPT({ classifierValue }) {
  return (
    <>
      <div className='stmnt'>
        True{' '}
        <input
          type='range'
          step={1}
          min={0}
          max={1}
          className={classifierValue === true ? 'green' : 'red'}
          defaultValue={classifierValue === true ? 0 : 1}
        />{' '}
        False
        <div className='classifier-text'>Classifier Detection</div>
      </div>
    </>
  );
}
