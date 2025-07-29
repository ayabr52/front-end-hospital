// src/nurse-sections/Appointments/NurseAppointments.jsx
import React, { useState } from 'react';
import { CalendarCheck, User, Clock } from 'lucide-react';

const initialNurseAppointments = [
  { id: 1, patientName: 'علياء محمود', date: '2025-07-25', time: '10:00 صباحاً', status: 'قادم', notes: 'فحص حيوي روتيني' },
  { id: 2, patientName: 'سامي خالد', date: '2025-07-25', time: '11:30 صباحاً', status: 'قادم', notes: 'تغيير ضماد' },
  { id: 3, patientName: 'ليلى فادي', date: '2025-07-26', time: '09:00 صباحاً', status: 'قادم', notes: 'إعطاء دواء' },
];

const NurseAppointments = () => {
  const [appointments, setAppointments] = useState(initialNurseAppointments);

  const handleCompleteAppointment = (id) => {
    setAppointments(appointments.map(appt =>
      appt.id === id ? { ...appt, status: 'مكتمل' } : appt
    ));
    // For demonstration, we'll use a simple alert, but for production, use a custom modal.
    alert('تم وضع علامة على الموعد كمكتمل.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">مواعيدي</h3>

      <h4 className="text-xl font-semibold text-gray-700 mb-4">المواعيد القادمة واليومية</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">اسم المريض</th>
              <th className="py-3 px-6 text-right">التاريخ</th>
              <th className="py-3 px-6 text-right">الوقت</th>
              <th className="py-3 px-6 text-right">ملاحظات</th>
              <th className="py-3 px-6 text-right">الحالة</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">لا توجد مواعيد حالياً.</td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right whitespace-nowrap">{appt.patientName}</td>
                  <td className="py-3 px-6 text-right">{appt.date}</td>
                  <td className="py-3 px-6 text-right">{appt.time}</td>
                  <td className="py-3 px-6 text-right">{appt.notes}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      appt.status === 'مكتمل' ? 'bg-green-200 text-green-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {appt.status === 'قادم' && (
                      <button
                        onClick={() => handleCompleteAppointment(appt.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                        title="وضع علامة كمكتمل"
                      >
                        <CalendarCheck size={16} />
                      </button>
                    )}
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

export default NurseAppointments;
