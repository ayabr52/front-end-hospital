// src/components/ConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ show, title, message, onConfirm, onCancel }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans text-right" dir="rtl">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        تأكيد
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
