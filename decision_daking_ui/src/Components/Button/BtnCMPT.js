import React from 'react';

function BtnCMPT({ buttonID, buttonName, handleBtnClick, shouldDisable }) {
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
    />
  );
}

export default BtnCMPT;
