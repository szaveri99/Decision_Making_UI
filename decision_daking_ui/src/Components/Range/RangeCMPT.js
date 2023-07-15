import React, { useState } from 'react';
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
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    handleRangeChange(index, value);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      True <input
        type='range'
        step={1}
        min={0}
        max={5}
        value={rangeValue}
        onInput={handleChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      False
      {showTooltip && <span className='tooltip'>{rangeStmt[rangeValue]}</span>}
    </div>
  );
}

export default RangeCMPT;
