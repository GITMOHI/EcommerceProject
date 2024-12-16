// ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; //when isModalOpen is false...(not have told to open the modal..)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h3 className="text-lg font-semibold">Confirm Changes</h3>
        <p className="mt-2">Are you sure you want to save changes?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-[#db4444] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#b52a2a] mr-2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
