// import './index.css';
import React from 'react';
import Modal from 'react-modal';

export default function ModalCMPT({
  showModal,
  userResponses,
  setIsSubmit,
  setShowModal,
}) {
  return (
    <div>
      <Modal
        isOpen={showModal}
        contentLabel='Modal'
        className='modal'
        overlayClassName='modal-overlay'
        appElement={document.getElementById('root')}
      >
        {userResponses.map((eachResponse) => {
          return (
            <div>
              <h1>Actual Text: {eachResponse.statement}</h1>
              <h1>Modified Text: {eachResponse.text}</h1>
              <h1>Rating: {eachResponse.range}</h1>
            </div>
          );
        })}
        <button onClick={() => setIsSubmit(true) && console.log(userResponses)}>
          submit
        </button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>
  );
}
