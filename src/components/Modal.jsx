// src/components/Modal.jsx
import React from 'react';

// A generic Modal component for confirmations and alerts
const Modal = ({ show, title, message, onConfirm, onCancel, type = 'alert' }) => {
  if (!show) {
    return null;
  }

  const isConfirm = type === 'confirm';
  const isAlert = type === 'alert';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{title}</h3>
        <p className="text-gray-700 mb-6 text-center">{message}</p>
        <div className={`flex ${isConfirm ? 'justify-between' : 'justify-center'} space-x-4 space-x-reverse`}>
          {isConfirm && (
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              إلغاء
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors duration-200 ${
              isConfirm ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isConfirm ? 'تأكيد الحذف' : 'موافق'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
