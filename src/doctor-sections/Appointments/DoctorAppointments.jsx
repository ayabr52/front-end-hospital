// src/doctor-sections/Appointments/DoctorAppointments.jsx
import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

const initialDoctorAppointments = [
  { id: 1, patientName: 'علياء محمود', date: '2025-07-25', time: '10:00 صباحاً', status: 'قيد الانتظار', notes: 'استشارة عامة' },
  { id: 2, patientName: 'سامي خالد', date: '2025-07-28', time: '02:00 مساءً', status: 'مقبول', notes: 'متابعة حالة' },
  { id: 3, patientName: 'ليلى فادي', date: '2025-07-20', time: '09:00 صباحاً', status: 'مرفوض', notes: 'تعارض في المواعيد' },
];

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState(initialDoctorAppointments);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);

  const handleAcceptAppointment = (id) => {
    setAppointments(appointments.map(appt =>
      appt.id === id ? { ...appt, status: 'مقبول' } : appt
    ));
    // For demonstration, we'll use a simple alert, but for production, use a custom modal.
    alert('تم قبول الموعد بنجاح.');
  };

  const handleRejectAppointment = (id) => {
    setAppointments(appointments.map(appt =>
      appt.id === id ? { ...appt, status: 'مرفوض' } : appt
    ));
    // For demonstration, we'll use a simple alert, but for production, use a custom modal.
    alert('تم رفض الموعد.');
  };

  const handleViewPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  const handleClosePatientDetails = () => {
    setSelectedPatient(null);
    setShowPatientDetails(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة المواعيد</h3>

      <h4 className="text-xl font-semibold text-gray-700 mb-4">المواعيد المحجوزة</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">اسم المريض</th>
              <th className="py-3 px-6 text-right">التاريخ</th>
              <th className="py-3 px-6 text-right">الوقت</th>
              <th className="py-3 px-6 text-right">الحالة</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">لا توجد مواعيد حالياً.</td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right whitespace-nowrap">{appt.patientName}</td>
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
                    <div className="flex item-center justify-center space-x-2 space-x-reverse">
                      {appt.status === 'قيد الانتظار' && (
                        <>
                          <button
                            onClick={() => handleAcceptAppointment(appt.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                            title="قبول الموعد"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleRejectAppointment(appt.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            title="رفض الموعد"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleViewPatientDetails(appt)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                        title="عرض معلومات المريض"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Patient Details Modal/Section */}
      {showPatientDetails && selectedPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-right relative">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">معلومات المريض: {selectedPatient.patientName}</h4>
            <p className="mb-2"><strong className="font-medium">التاريخ:</strong> {selectedPatient.date}</p>
            <p className="mb-2"><strong className="font-medium">الوقت:</strong> {selectedPatient.time}</p>
            <p className="mb-4"><strong className="font-medium">ملاحظات الموعد:</strong> {selectedPatient.notes}</p>
            {/* هنا يمكن إضافة المزيد من معلومات المريض الحقيقية مثل العمر، الجنس، الرقم الوطني، إلخ. */}
            <button
              onClick={handleClosePatientDetails}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
