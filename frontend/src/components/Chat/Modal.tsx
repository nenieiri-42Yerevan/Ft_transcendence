import { useState } from 'react';
import React from 'react';

const Modal = ({ children, onClose }) => {

  const closeModal = () => {
    onClose(true);
  };

  const createRoom = () => {
    onClose(false);
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black z-50`}>
      <div className="w-full md:w-2/5 h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-4 rounded text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
        <button type="button" className="bg-red-600 text-white rounded m-2 px-4 py-2 hover:bg-red-700" onClick={closeModal}>
          Close
        </button>
        <button type="button" className="mt-4 bg-blue-600 text-white rounded m-2 px-4 py-2 hover:bg-blue-700" onClick={createRoom}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
