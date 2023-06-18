import React from 'react';

function RangeCMPT({ rangeValue, handleRangeChange }) {
  const handleChange = (event) => {
    handleRangeChange(event.target.value);
  };
  return (
    <div>
      <input
        type='range'
        step={1}
        min={0}
        max={7}
        value={rangeValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default RangeCMPT;
