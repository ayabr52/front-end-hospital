// src/admin-sections/Accounts/UserAccountsList.jsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const UserAccountsList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">الاسم</th>
            <th className="py-3 px-6 text-right">البريد الإلكتروني</th>
            <th className="py-3 px-6 text-right">الدور</th>
            <th className="py-3 px-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-right whitespace-nowrap">{user.name}</td>
              <td className="py-3 px-6 text-right">{user.email}</td>
              <td className="py-3 px-6 text-right">
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800">
                  {user.role}
                </span>
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                <div className="flex item-center justify-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => onEdit(user)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                    title="تعديل"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
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

export default UserAccountsList;
