// src/sections/DoctorPublicAppointments.jsx
import React, { useState } from 'react';
import { CalendarPlus } from 'lucide-react';

const DoctorPublicAppointments = ({ doctor, onBack }) => {
  // بيانات مواعيد وهمية لهذا الطبيب
  const [availableAppointments, setAvailableAppointments] = useState([
    { id: 1, date: '2025-08-01', time: '09:00 صباحاً', status: 'متاح' },
    { id: 2, date: '2025-08-01', time: '11:00 صباحاً', status: 'متاح' },
    { id: 3, date: '2025-08-02', time: '14:00 مساءً', status: 'متاح' },
    { id: 4, date: '2025-08-03', time: '10:00 صباحاً', status: 'متاح' },
  ]);

  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [newAppointmentTime, setNewAppointmentTime] = useState('');

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (newAppointmentDate && newAppointmentTime) {
      // هنا يمكن إضافة منطق حجز الموعد الفعلي (إرسال للباك إند)
      const newApptRequest = {
        doctorId: doctor.name, // استخدام اسم الطبيب كمعرف مؤقت
        date: newAppointmentDate,
        time: newAppointmentTime,
        patientId: 'current_patient_id', // يجب استبدال هذا بمعرف المريض الفعلي
        status: 'قيد الانتظار'
      };
      alert(`تم إرسال طلب حجز موعد مع ${doctor.name} بتاريخ ${newAppointmentDate} الساعة ${newAppointmentTime}. سيتم مراجعة طلبك.`);
      console.log('New appointment request:', newApptRequest);
      // بعد الإرسال، يمكن مسح النموذج أو العودة للخلف
      setNewAppointmentDate('');
      setNewAppointmentTime('');
    } else {
      alert('يرجى اختيار التاريخ والوقت لحجز الموعد.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <button
        onClick={onBack}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200 mb-6 flex items-center"
      >
        العودة لقائمة الأطباء
      </button>

      <h3 className="text-2xl font-semibold text-blue-800 mb-4">
        مواعيد الدكتور: {doctor.name} ({doctor.specialty})
      </h3>
      <p className="text-gray-600 mb-6">{doctor.bio}</p>

      <h4 className="text-xl font-semibold text-gray-700 mb-4">المواعيد المتاحة</h4>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">التاريخ</th>
              <th className="py-3 px-6 text-right">الوقت</th>
              <th className="py-3 px-6 text-right">الحالة</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {availableAppointments.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 px-6 text-center text-gray-500">لا توجد مواعيد متاحة حالياً.</td>
              </tr>
            ) : (
              availableAppointments.map((appt) => (
                <tr key={appt.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right">{appt.date}</td>
                  <td className="py-3 px-6 text-right">{appt.time}</td>
                  <td className="py-3 px-6 text-right">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800">
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h4 className="text-xl font-semibold text-gray-700 mb-4">طلب حجز موعد جديد</h4>
      <form onSubmit={handleBookAppointment} className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div>
          <label htmlFor="appt-date" className="block text-gray-700 text-sm font-bold mb-2">التاريخ المطلوب</label>
          <input
            type="date"
            id="appt-date"
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
            value={newAppointmentDate}
            onChange={(e) => setNewAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="appt-time" className="block text-gray-700 text-sm font-bold mb-2">الوقت المطلوب</label>
          <input
            type="time"
            id="appt-time"
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
            value={newAppointmentTime}
            onChange={(e) => setNewAppointmentTime(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <CalendarPlus size={20} className="ml-2" />
          إرسال طلب الحجز
        </button>
      </form>
    </div>
  );
};

export default DoctorPublicAppointments;
