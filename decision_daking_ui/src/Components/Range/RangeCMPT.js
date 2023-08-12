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
      <Box sx={{ width: 600 }}>
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
          colors={['#FF5722', '#FF9800']}
          sx={{
            width: 600,
            height: 10,
            color: 'white', // Hide the default track color
            '& .MuiSlider-rail': {
              backgroundImage: 'linear-gradient(to right, #42B3F5, #609CD2, #7E86AE, #9C6F8B, #BA5967, #D84244);',
              height: 10,
            },
            '& .MuiSlider-thumb': {
              backgroundColor: 'white', // Customize thumb color
            },
            '& .MuiSlider-markLabel': {
              color: 'white', // Change marks text color
              fontWeight: 'bold',
              fontSize: 14,
            },
          }}
        />
      </Box>
    </div>
  );
}

export default RangeCMPT;
