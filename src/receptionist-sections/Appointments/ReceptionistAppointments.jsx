// src/receptionist-sections/Appointments/ReceptionistAppointments.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const initialAppointments = [
  { id: 1, patientName: 'علياء محمود', doctorName: 'د. جهاد موصلي', date: '2025-07-25', time: '10:00 صباحاً', status: 'مؤكدة' },
  { id: 2, patientName: 'سامي خالد', doctorName: 'د. لما قيسون', date: '2025-07-26', time: '02:00 مساءً', status: 'قيد الانتظار' },
  { id: 3, patientName: 'ليلى فادي', doctorName: 'د. أغيد السلام', date: '2025-07-27', time: '09:00 صباحاً', status: 'ملغاة' },
];

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '', doctorName: '', date: '', time: '', status: 'قيد الانتظار'
  });

  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setFormData({ patientName: '', doctorName: '', date: '', time: '', status: 'قيد الانتظار' });
    setShowForm(true);
  };

  const handleEditAppointment = (appt) => {
    setSelectedAppointment(appt);
    setFormData(appt);
    setShowForm(true);
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الموعد؟')) {
      setAppointments(appointments.filter(appt => appt.id !== id));
    }
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    if (selectedAppointment) {
      setAppointments(appointments.map(appt =>
        appt.id === selectedAppointment.id ? { ...formData, id: selectedAppointment.id } : appt
      ));
    } else {
      setAppointments([...appointments, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedAppointment(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة المواعيد</h3>

      <div className="mb-8">
        <button
          onClick={handleAddAppointment}
          className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="ml-2" />
          إضافة موعد جديد
        </button>
      </div>

      {showForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedAppointment ? 'تعديل موعد' : 'إضافة موعد جديد'}
          </h4>
          <form onSubmit={handleSaveAppointment} className="space-y-4">
            <div>
              <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">اسم المريض</label>
              <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="doctorName" className="block text-gray-700 text-sm font-bold mb-2">اسم الطبيب</label>
              <select id="doctorName" name="doctorName" value={formData.doctorName} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
                <option value="">اختر الطبيب</option>
                <option value="د. جهاد موصلي">د. جهاد موصلي</option>
                <option value="د. لما قيسون">د. لما قيسون</option>
                <option value="د. أغيد السلام">د. أغيد السلام</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">التاريخ</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">الوقت</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
              </div>
            </div>
            <div>
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">الحالة</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
                <option value="قيد الانتظار">قيد الانتظار</option>
                <option value="مؤكدة">مؤكدة</option>
                <option value="ملغاة">ملغاة</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                {selectedAppointment ? 'حفظ التعديلات' : 'إضافة'}
              </button>
              <button
                type="button"
                onClick={handleCancelForm}
                className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      <h4 className="text-xl font-semibold text-gray-700 mb-4 mt-8">قائمة المواعيد</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">اسم المريض</th>
              <th className="py-3 px-6 text-right">اسم الطبيب</th>
              <th className="py-3 px-6 text-right">التاريخ</th>
              <th className="py-3 px-6 text-right">الوقت</th>
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
                  <td className="py-3 px-6 text-right">{appt.doctorName}</td>
                  <td className="py-3 px-6 text-right">{appt.date}</td>
                  <td className="py-3 px-6 text-right">{appt.time}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      appt.status === 'مؤكدة' ? 'bg-green-200 text-green-800' :
                      appt.status === 'ملغاة' ? 'bg-red-200 text-red-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <div className="flex item-center justify-center gap-4">
                      <button
                        onClick={() => handleEditAppointment(appt)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                        title="تعديل الموعد"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(appt.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                        title="حذف الموعد"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default ReceptionistAppointments;
