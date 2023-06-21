import React, { useState } from 'react';
import './index.css';

function RangeCMPT({ rangeValue, handleRangeChange }) {
  const rangeStmt = [
    'True',
    'Mostly True',
    'Half True',
    'Mostly False',
    'Half False',
    'Pants on Fire',
  ];
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    handleRangeChange(value);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type='range'
        step={1}
        min={0}
        max={5}
        value={rangeValue}
        onInput={handleChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showTooltip && <span className='tooltip'>{rangeStmt[rangeValue]}</span>}
    </div>
  );
}

export default RangeCMPT;
