import React from 'react'

function index({buttonID , buttonName}) {
  return (
    <input type={'button'} id={buttonID} value={buttonName} />
  )
}

export default index;