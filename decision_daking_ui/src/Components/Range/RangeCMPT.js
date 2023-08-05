import React from 'react';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import './index.css';

function RangeCMPT({ rangeValue, handleRangeChange, index }) {
  const rangeStmt = [
    'true',
    'mostly-true',
    'half-true',
    'barely-false',
    'false',
    'pants-on-fire',
  ];

  const handleChange = (event) => {
    // const { value } = event.target;
    handleRangeChange(index, event);
  };

  return (
    <div style={{ position: 'relative' }}>
      True <Range
        step={1}
        min={0}
        max={5}
        defaultValue={0}
        ariaLabelForHandle={'hello'}
        onChange={handleChange}
      /> False
    </div>
  );
}

export default RangeCMPT;
