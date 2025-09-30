// src/admin-sections/Departments/DepartmentsList.jsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const DepartmentsList = ({ departments, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">الاسم</th>
            <th className="py-3 px-6 text-right">الوصف</th>
            <th className="py-3 px-6 text-right">الاختصاص</th>
            <th className="py-3 px-6 text-right">تاريخ الإضافة</th>
            <th className="py-3 px-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {departments.map((dept) => (
            <tr key={dept.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-right whitespace-nowrap">{dept.name}</td>
              <td className="py-3 px-6 text-right">{dept.description}</td>
              <td className="py-3 px-6 text-right">{dept.specialty}</td>
              <td className="py-3 px-6 text-right">{new Date(dept.created_at).toLocaleDateString()}</td> {/* تم التعديل */}
              <td className="py-3 px-6 text-center whitespace-nowrap">
                <div className="flex item-center justify-center gap-4">
                  <button
                    onClick={() => onEdit(dept)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                    title="تعديل"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(dept.id)}
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

export default DepartmentsList;
