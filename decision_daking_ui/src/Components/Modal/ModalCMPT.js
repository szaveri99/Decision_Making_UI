import './index.css';
import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function ModalCMPT({
  showModal,
  userResponses,
  setIsSubmit,
  setShowModal,
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
      // toast.success('Data submitted successfully');
    } catch (error) {
      console.error(error);
      // toast.error('Failed to submit data !!');
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
        <button onClick={() => {
          setIsSubmit(true);
          submitData(userResponses);
          setShowModal(false)}}>
          Submit
        </button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </Modal>
  );
}
