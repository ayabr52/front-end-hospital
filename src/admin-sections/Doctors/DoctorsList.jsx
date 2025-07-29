// src/admin-sections/Doctors/DoctorsList.jsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const DoctorsList = ({ doctors, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">الصورة</th>
            <th className="py-3 px-6 text-right">الاسم</th>
            <th className="py-3 px-6 text-right">البريد الإلكتروني</th>
            <th className="py-3 px-6 text-right">الموبايل</th>
            <th className="py-3 px-6 text-right">القسم</th>
            <th className="py-3 px-6 text-right">الاختصاص</th>
            <th className="py-3 px-6 text-right">التقييم</th>
            <th className="py-3 px-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-right">
                <img src={doctor.image} alt={doctor.first_name} className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">{doctor.first_name} {doctor.last_name}</td>
              <td className="py-3 px-6 text-right">{doctor.email}</td>
              <td className="py-3 px-6 text-right">{doctor.mobile}</td>
              <td className="py-3 px-6 text-right">{doctor.department_id}</td> {/* Use department name later */}
              <td className="py-3 px-6 text-right">{doctor.specialty_id}</td> {/* Use specialty name later */}
              <td className="py-3 px-6 text-right">{doctor.rating}</td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                <div className="flex item-center justify-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => onEdit(doctor)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                    title="تعديل"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(doctor.id)}
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

export default DoctorsList;
