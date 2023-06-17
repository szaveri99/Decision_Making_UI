import React from 'react';
import Instructions from '../Instructions/index.js';
import MyStmt from '../Stmt/index.js';
import MyRange from '../Range/index.js';
import MyRadio from '../Radio/index.js';
import MyInput from '../MyInput/index.js';

function index() {
  return (
    <>
      <Instructions insText={'oye this is me'} />
      <MyStmt txt={'Hola'} />
      <MyRange />
      <MyRadio />
      <MyInput />
    </>
  );
}

export default index;
