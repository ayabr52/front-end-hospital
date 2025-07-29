// src/patient-sections/Rooms/PatientRoomBooking.jsx
import React, { useState } from 'react';
import { Bed, CalendarPlus } from 'lucide-react';

const availableRooms = [
  { id: 1, code: 'NT2', department: 'النسائية والتوليد', bed_capacity: 5, available: true },
  { id: 2, code: 'ICU1', department: 'العناية المركزة', bed_capacity: 2, available: false },
  { id: 3, code: 'PED3', department: 'الأطفال', bed_capacity: 4, available: true },
  { id: 4, code: 'GEN10', department: 'الجراحة العامة', bed_capacity: 3, available: true },
];

const PatientRoomBooking = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [bookingDate, setBookingDate] = '';

  const handleBookRoom = () => {
    if (selectedRoom && bookingDate) {
      const roomToBook = availableRooms.find(room => room.code === selectedRoom);
      if (roomToBook && roomToBook.available) {
        const newBooking = {
          id: Date.now(),
          roomCode: roomToBook.code,
          department: roomToBook.department,
          date: bookingDate,
          status: 'قيد الانتظار', // يمكن أن يكون بانتظار موافقة الإدارة
        };
        setBookedRooms([...bookedRooms, newBooking]);
        // استخدام رسالة مخصصة بدلاً من alert()
        // يمكنك هنا عرض modal أو رسالة تأكيد داخل الواجهة
        console.log(`تم طلب حجز الغرفة ${roomToBook.code} بتاريخ ${bookingDate}.`);
        // For demonstration, we'll use a simple alert, but for production, use a custom modal.
        alert(`تم طلب حجز الغرفة ${roomToBook.code} بتاريخ ${bookingDate}.`);
        setSelectedRoom('');
        setBookingDate('');
      } else {
        // For demonstration, we'll use a simple alert, but for production, use a custom modal.
        alert('الغرفة غير متاحة للحجز أو غير موجودة.');
      }
    } else {
      // For demonstration, we'll use a simple alert, but for production, use a custom modal.
      alert('يرجى اختيار الغرفة وتحديد تاريخ الحجز.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">حجز الغرف الداخلية</h3>

      <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">حجز غرفة</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="room-select" className="block text-gray-700 text-sm font-bold mb-2">اختر الغرفة</label>
            <select
              id="room-select"
              className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              required
            >
              <option value="">-- اختر غرفة --</option>
              {availableRooms.map(room => (
                <option key={room.id} value={room.code} disabled={!room.available}>
                  {room.code} ({room.department}) - {room.available ? 'متاحة' : 'غير متاحة'}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div>
            <label htmlFor="booking-date" className="block text-gray-700 text-sm font-bold mb-2">تاريخ الحجز</label>
            <input
              type="date"
              id="booking-date"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          onClick={handleBookRoom}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full flex items-center hover:bg-green-700 transition-colors duration-200"
        >
          <CalendarPlus size={20} className="ml-2" />
          تأكيد حجز الغرفة
        </button>
      </div>

      <h4 className="text-xl font-semibold text-gray-700 mb-4">الغرف المحجوزة</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">رمز الغرفة</th>
              <th className="py-3 px-6 text-right">القسم</th>
              <th className="py-3 px-6 text-right">تاريخ الحجز</th>
              <th className="py-3 px-6 text-right">الحالة</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {bookedRooms.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-500">لا توجد غرف محجوزة حالياً.</td>
              </tr>
            ) : (
              bookedRooms.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right whitespace-nowrap">{booking.roomCode}</td>
                  <td className="py-3 px-6 text-right">{booking.department}</td>
                  <td className="py-3 px-6 text-right">{booking.date}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'مقبول' ? 'bg-green-200 text-green-800' :
                      booking.status === 'مرفوض' ? 'bg-red-200 text-red-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
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

export default PatientRoomBooking;
