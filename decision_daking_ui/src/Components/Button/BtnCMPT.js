import React from 'react';

function BtnCMPT({
  buttonID,
  buttonName,
  handleBtnClick,
  shouldDisable,
  myStyle,
}) {
  if (buttonID === 'submit-btn' && shouldDisable) {
    return <></>;
  }
  return (
    <input
      type={'button'}
      id={buttonID}
      value={buttonName}
      disabled={shouldDisable}
      onClick={handleBtnClick}
      style={myStyle}
    />
  );
}

export default BtnCMPT;
