// src/patient-sections/Appointments/PatientAppointments.jsx
import React, { useState } from 'react';
import { CalendarPlus, CalendarCheck, CalendarX } from 'lucide-react';

const initialAppointments = [
  { id: 1, doctor: 'د. جهاد موصلي', date: '2025-07-25', time: '10:00 صباحاً', status: 'قيد الانتظار' },
  { id: 2, doctor: 'د. لما قيسون', date: '2025-07-28', time: '02:00 مساءً', status: 'مقبول' },
  { id: 3, doctor: 'د. أغيد السلام', date: '2025-07-20', time: '09:00 صباحاً', status: 'مرفوض' },
];

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ doctor: '', date: '', time: '' });

  const handleBookAppointment = () => {
    // هنا يمكن إضافة منطق حجز الموعد الفعلي
    // حالياً، سنضيف موعدًا وهميًا
    if (newAppointment.doctor && newAppointment.date && newAppointment.time) {
      const newAppt = {
        id: Date.now(),
        doctor: newAppointment.doctor,
        date: newAppointment.date,
        time: newAppointment.time,
        status: 'قيد الانتظار', // الحالة الافتراضية
      };
      setAppointments([...appointments, newAppt]);
      setNewAppointment({ doctor: '', date: '', time: '' });
      setShowBookingForm(false);
      // استخدام رسالة مخصصة بدلاً من alert()
      // يمكنك هنا عرض modal أو رسالة تأكيد داخل الواجهة
      console.log('تم إرسال طلب حجز الموعد بنجاح. سيتم مراجعته من قبل الطبيب.');
      // For demonstration, we'll use a simple alert, but for production, use a custom modal.
      alert('تم إرسال طلب حجز الموعد بنجاح. سيتم مراجعته من قبل الطبيب.');
    } else {
      // For demonstration, we'll use a simple alert, but for production, use a custom modal.
      alert('يرجى ملء جميع حقول حجز الموعد.');
    }
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد إلغاء هذا الموعد؟')) {
      setAppointments(appointments.filter(appt => appt.id !== id));
      // For demonstration, we'll use a simple alert, but for production, use a custom modal.
      alert('تم إلغاء الموعد.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة المواعيد</h3>

      <div className="mb-8">
        <button
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <CalendarPlus size={20} className="ml-2" />
          {showBookingForm ? 'إخفاء نموذج الحجز' : 'حجز موعد جديد'}
        </button>

        {showBookingForm && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">حجز موعد</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="doctor-select" className="block text-gray-700 text-sm font-bold mb-2">اختر الطبيب</label>
                <select
                  id="doctor-select"
                  className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  required
                >
                  <option value="">-- اختر طبيباً --</option>
                  <option value="د. جهاد موصلي">د. جهاد موصلي (جراحة عامة)</option>
                  <option value="د. لما قيسون">د. لما قيسون (نسائية وتوليد)</option>
                  <option value="د. أغيد السلام">د. أغيد السلام (قلبية)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div>
                <label htmlFor="appointment-date" className="block text-gray-700 text-sm font-bold mb-2">التاريخ</label>
                <input
                  type="date"
                  id="appointment-date"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="appointment-time" className="block text-gray-700 text-sm font-bold mb-2">الوقت</label>
                <input
                  type="time"
                  id="appointment-time"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <button
              onClick={handleBookAppointment}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              تأكيد الحجز
            </button>
          </div>
        )}
      </div>

      <h4 className="text-xl font-semibold text-gray-700 mb-4">مواعيدي القادمة</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">الطبيب</th>
              <th className="py-3 px-6 text-right">التاريخ</th>
              <th className="py-3 px-6 text-right">الوقت</th>
              <th className="py-3 px-6 text-right">الحالة</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-right whitespace-nowrap">{appt.doctor}</td>
                <td className="py-3 px-6 text-right">{appt.date}</td>
                <td className="py-3 px-6 text-right">{appt.time}</td>
                <td className="py-3 px-6 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    appt.status === 'مقبول' ? 'bg-green-200 text-green-800' :
                    appt.status === 'مرفوض' ? 'bg-red-200 text-red-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {appt.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {appt.status === 'قيد الانتظار' && (
                    <button
                      onClick={() => handleCancelAppointment(appt.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                      title="إلغاء الموعد"
                    >
                      <CalendarX size={16} />
                    </button>
                  )}
                  {appt.status === 'مقبول' && (
                    <span className="text-green-600" title="تم قبول الموعد">
                      <CalendarCheck size={20} />
                    </span>
                  )}
                </td> {/* Closing tag for td was missing */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientAppointments;
