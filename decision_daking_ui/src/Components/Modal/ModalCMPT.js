import './index.css';
import React from 'react';
import Modal from 'react-modal';

export default function ModalCMPT({
  showModal,
  userResponses,
  setIsSubmit,
  setShowModal,
}) {
  return (
    <Modal
      isOpen={showModal}
      contentLabel='Modal'
      className='modal'
      overlayClassName='modal-overlay'
      appElement={document.getElementById('root')}
    >
      {userResponses.map((eachResponse, index) => {
        return (
          <div key={index} id='massages'>
            <h1 className='firstChildOfMassages'>
              <b>Actual Text</b> : {eachResponse.statement}
            </h1>
            <h1>
              <b>Modified Text</b> : {eachResponse.text}
            </h1>
            <h1>
              <b>Rating</b> : {eachResponse.rangeTxt}
            </h1>
          </div>
        );
      })}
      <div className='btns'>
        <button onClick={() => setIsSubmit(true) && console.log(userResponses)}>
          submit
        </button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </Modal>
  );
}
