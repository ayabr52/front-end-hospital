// src/admin-sections/Patients/PatientsList.jsx
import React from 'react';
import { Check, X, Trash2 } from 'lucide-react';

const PatientsList = ({ patients, onAccept, onReject, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">الصورة</th>
            <th className="py-3 px-6 text-right">الاسم الكامل</th>
            <th className="py-3 px-6 text-right">البريد الإلكتروني</th>
            <th className="py-3 px-6 text-right">رقم الهاتف</th>
            <th className="py-3 px-6 text-right">الحالة</th>
            <th className="py-3 px-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-right">
                <img src={patient.image} alt={patient.full_name} className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">{patient.full_name}</td>
              <td className="py-3 px-6 text-right">{patient.email}</td>
              <td className="py-3 px-6 text-right">{patient.mobile}</td>
              <td className="py-3 px-6 text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  patient.status === 'مقبول' ? 'bg-green-200 text-green-800' :
                  patient.status === 'مرفوض' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {patient.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                <div className="flex item-center justify-center space-x-2 space-x-reverse">
                  {patient.status === 'بانتظار القبول' && (
                    <>
                      <button
                        onClick={() => onAccept(patient.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                        title="قبول"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => onReject(patient.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-200"
                        title="رفض"
                      >
                        <X size={16} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onDelete(patient.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    title="حذف"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsList;
