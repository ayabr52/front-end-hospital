// src/receptionist-sections/Patients/ReceptionistPatients.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, User } from 'lucide-react';

const initialPatients = [
  { id: 1, name: 'علياء محمود', email: 'alya.m@example.com', phone: '0912345678', status: 'نشط' },
  { id: 2, name: 'سامي خالد', email: 'sami.k@example.com', phone: '0998765432', status: 'نشط' },
  { id: 3, name: 'ليلى فادي', email: 'layla.f@example.com', phone: '0911223344', status: 'غير نشط' },
];

const ReceptionistPatients = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', status: 'نشط'
  });

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setFormData({ name: '', email: '', phone: '', status: 'قيد الانتظار' }); // Changed default status to 'قيد الانتظار'
    setShowForm(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData(patient);
    setShowForm(true);
  };

  const handleDeletePatient = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المريض؟')) {
      setPatients(patients.filter(patient => patient.id !== id));
    }
  };

  const handleSavePatient = (e) => {
    e.preventDefault();
    if (selectedPatient) {
      setPatients(patients.map(patient =>
        patient.id === selectedPatient.id ? { ...formData, id: selectedPatient.id } : patient
      ));
    } else {
      setPatients([...patients, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedPatient(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة المرضى</h3>

      <div className="mb-8">
        <button
          onClick={handleAddPatient}
          className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="ml-2" />
          إضافة مريض جديد
        </button>
      </div>

      {showForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedPatient ? 'تعديل بيانات المريض' : 'إضافة مريض جديد'}
          </h4>
          <form onSubmit={handleSavePatient} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">اسم المريض</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">رقم الهاتف</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">الحالة</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
                <option value="نشط">نشط</option>
                <option value="غير نشط">غير نشط</option>
                <option value="قيد الانتظار">قيد الانتظار</option> {/* Added 'قيد الانتظار' option */}
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
                {selectedPatient ? 'حفظ التعديلات' : 'إضافة'}
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

      <h4 className="text-xl font-semibold text-gray-700 mb-4 mt-8">قائمة المرضى</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">الاسم</th>
              <th className="py-3 px-6 text-right">البريد الإلكتروني</th>
              <th className="py-3 px-6 text-right">رقم الهاتف</th>
              <th className="py-3 px-6 text-right">الحالة</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {patients.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">لا توجد مرضى حالياً.</td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right whitespace-nowrap">{patient.name}</td>
                  <td className="py-3 px-6 text-right">{patient.email}</td>
                  <td className="py-3 px-6 text-right">{patient.phone}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      patient.status === 'نشط' ? 'bg-green-200 text-green-800' :
                      patient.status === 'غير نشط' ? 'bg-red-200 text-red-800' :
                      'bg-yellow-200 text-yellow-800' // Style for 'قيد الانتظار'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <div className="flex item-center justify-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                        title="تعديل المريض"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeletePatient(patient.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                        title="حذف المريض"
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

export default ReceptionistPatients;
