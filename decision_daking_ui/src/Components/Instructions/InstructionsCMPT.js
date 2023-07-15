import React from 'react';

function InstructionsCMPT({ insText }) {
  return (
    <div className='prop-guidline'>
      {/* To use this application, follow these steps:{' '} */}
      {insText.split('.').map((str, currentKey) => (
        <p key={currentKey} dangerouslySetInnerHTML={{ __html: str }}></p>
      ))}
    </div>
  );
}

export default InstructionsCMPT;
