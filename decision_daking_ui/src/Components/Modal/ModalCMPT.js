import './index.css';
import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';

export default function ModalCMPT({
  showModal,
  userResponses,
  setShowModal,
  handleSubmit,
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
        return eachResponse.submittedStmt.map((eachStmt, eachStmtIndex) => {
          console.log(eachStmt);
          return (
            <div key={eachStmtIndex} id='massages'>
              <h1 className='firstChildOfMassages'>
                <b>Actual Text</b> : {eachStmt.stmt.originalTxt}
              </h1>
              <h1>
                <b>Modified Text</b> : {eachStmt.stmt.modifiedTxt}
              </h1>
              <h1>
                <b>Rating</b> : {eachStmt.rangeVal}
              </h1>
              <div>
                <h1>Classifier Values</h1>
                <b>Original: </b>{`${eachStmt.classifier.originalTxtClassifier}`}
                <b>Modified: </b>{`${eachStmt.classifier.modifiedTxtClassifier}`}
              </div>
            </div>
          );
        });
      })}
      <div className='btns'>
        <button onClick={() => handleSubmit()}>Submit</button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </Modal>
  );
}
