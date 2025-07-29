// src/receptionist-sections/Rooms/ReceptionistRooms.jsx
import React, { useState } from 'react';
import { Bed, CheckCircle, XCircle } from 'lucide-react';

const initialRooms = [
  { id: 1, code: 'NT2', department: 'النسائية والتوليد', bed_capacity: 5, status: 'متاحة' },
  { id: 2, code: 'ICU1', department: 'العناية المركزة', bed_capacity: 2, status: 'مشغولة' },
  { id: 3, code: 'PED3', department: 'الأطفال', bed_capacity: 4, status: 'متاحة' },
];

const ReceptionistRooms = () => {
  const [rooms, setRooms] = useState(initialRooms);

  const handleToggleRoomStatus = (id) => {
    setRooms(rooms.map(room =>
      room.id === id ? { ...room, status: room.status === 'متاحة' ? 'مشغولة' : 'متاحة' } : room
    ));
    // For demonstration, we'll use a simple alert, but for production, use a custom modal.
    alert('تم تحديث حالة الغرفة.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة الغرف</h3>

      <h4 className="text-xl font-semibold text-gray-700 mb-4">حالة الغرف الداخلية</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">رمز الغرفة</th>
              <th className="py-3 px-6 text-right">القسم</th>
              <th className="py-3 px-6 text-right">عدد الأسرة</th>
              <th className="py-3 px-6 text-right">الحالة</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">لا توجد غرف حالياً.</td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right whitespace-nowrap">{room.code}</td>
                  <td className="py-3 px-6 text-right">{room.department}</td>
                  <td className="py-3 px-6 text-right">{room.bed_capacity}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      room.status === 'متاحة' ? 'bg-green-200 text-green-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleToggleRoomStatus(room.id)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        room.status === 'متاحة' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                      } text-white transition-colors duration-200`}
                      title={room.status === 'متاحة' ? 'وضع علامة كمشغولة' : 'وضع علامة كمتاحة'}
                    >
                      {room.status === 'متاحة' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceptionistRooms;
