import React from 'react';

function index() {
  return (
    <>
      <div>
        <form>
          <input type='text' />
          <input type='submit' value={'submit'} />
        </form>
      </div>
      <div>
        <p>This was original</p>
        <p>This was modified</p>
      </div>
    </>
  );
}

export default index;
