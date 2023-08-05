import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './index.css';

const marks = [
  {
    value: 0,
    label: 'true',
  },
  {
    value: 1,
    label: 'mostly-true',
  },
  {
    value: 2,
    label: 'half-true',
  },
  {
    value: 3,
    label: 'barely-false',
  },
  {
    value: 4,
    label: 'false',
  },
  {
    value: 5,
    label: 'pants-on-fire',
  },
];

function valuetext(value) {
  const rangeValue = marks[value].label;
  console.log(rangeValue);
  return rangeValue;
}

function RangeCMPT({ rangeValue, handleRangeChange, index }) {
  const handleChange = (event) => {
    handleRangeChange(index, event.target.value);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* True <Range
        step={1}
        min={0}
        max={5}
        defaultValue={0}
        ariaLabelForHandle={'hello'}
        onChange={handleChange}
      /> False */}
      <Box sx={{ width: 300 }}>
        <Slider
          step={1}
          min={0}
          max={5}
          defaultValue={0}
          aria-label='Custom marks'
          getAriaValueText={valuetext}
          valueLabelDisplay='auto'
          marks={marks}
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}

export default RangeCMPT;
