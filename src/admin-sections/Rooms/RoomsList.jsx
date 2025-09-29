// src/admin-sections/Rooms/RoomsList.jsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const RoomsList = ({ rooms, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">رقم الغرفة</th> {/* تم التعديل */}
            <th className="py-3 px-6 text-right">النوع</th> {/* إضافة حقل النوع */}
            <th className="py-3 px-6 text-right">القسم</th> {/* تم التعديل */}
            <th className="py-3 px-6 text-right">السعة (أسرة)</th> {/* تم التعديل */}
            <th className="py-3 px-6 text-right">الحالة</th> {/* إضافة حقل الحالة */}
            <th className="py-3 px-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {rooms.map((room) => (
            <tr key={room.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-right whitespace-nowrap">{room.room_number}</td> {/* تم التعديل */}
              <td className="py-3 px-6 text-right">{room.type}</td> {/* عرض النوع */}
              <td className="py-3 px-6 text-right">{room.department ? room.department.name : 'غير محدد'}</td> {/* تم التعديل */}
              <td className="py-3 px-6 text-right">{room.capacity}</td> {/* تم التعديل */}
              <td className="py-3 px-6 text-right">{room.status}</td> {/* عرض الحالة */}
              <td className="py-3 px-6 text-center whitespace-nowrap">
                <div className="flex item-center justify-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => onEdit(room)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                    title="تعديل"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(room.id)}
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

export default RoomsList;
