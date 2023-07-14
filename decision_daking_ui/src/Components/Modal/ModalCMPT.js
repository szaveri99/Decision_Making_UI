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

  const submitData = async (data) => {
    try {
     
      const formattedData = data.map(({ statement, text, rangeTxt }) => ({
        statement,
        text,
        rangeTxt,
      }));

      const response = await axios.post('http://localhost:5000/fetch-data', formattedData);
      console.log(response.formattedData);
    } catch (error) {
      console.error(error);
    }
  };

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
        <button onClick={() => handleSubmit()}>
          submit
        </button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </Modal>
  );
}
