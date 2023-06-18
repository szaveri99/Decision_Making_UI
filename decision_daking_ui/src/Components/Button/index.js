import React from 'react';

function index({ buttonID, buttonName, handleBtnClick, shouldDisable }) {
  const handleClick = () => {
    handleBtnClick();
  };
  if (buttonID === 'submit-btn' && shouldDisable) {
    return <></>;
  }
  return (
    <input
      type={'button'}
      id={buttonID}
      value={buttonName}
      disabled={shouldDisable}
      onClick={handleClick}
    />
  );
}

export default index;
