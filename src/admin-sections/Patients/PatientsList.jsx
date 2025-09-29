// src/admin-sections/Patients/PatientsList.jsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const PatientsList = ({ patients, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      {patients.length === 0 ? (
        <p className="text-gray-600 text-center py-8">لا يوجد مرضى لعرضهم حاليًا.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">الاسم</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">البريد الإلكتروني</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">رقم الهاتف</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">الرقم الوطني</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">تاريخ الميلاد</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">الجنس</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">العنوان</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">{patient.name}</td>
                <td className="py-3 px-4 text-gray-800">{patient.user?.email || 'N/A'}</td> {/* الوصول إلى البريد الإلكتروني عبر user.email */}
                <td className="py-3 px-4 text-gray-800">{patient.phone}</td>
                <td className="py-3 px-4 text-gray-800">{patient.national_id}</td>
                <td className="py-3 px-4 text-gray-800">{patient.dob ? patient.dob.split('T')[0] : 'N/A'}</td> {/* عرض التاريخ فقط */}
                <td className="py-3 px-4 text-gray-800">{patient.gender === 'male' ? 'ذكر' : 'أنثى'}</td>
                <td className="py-3 px-4 text-gray-800">{patient.address}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(patient)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded-full hover:bg-blue-100"
                      title="تعديل المريض"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => onDelete(patient.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded-full hover:bg-red-100"
                      title="حذف المريض"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsList;
