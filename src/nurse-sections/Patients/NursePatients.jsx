// src/nurse-sections/Patients/NursePatients.jsx
import React, { useState } from 'react';
import { Eye, Plus } from 'lucide-react';

const initialNursePatients = [
  { id: 1, name: 'علياء محمود', room: 'NT2', condition: 'مستقرة', details: 'مريضة بعد عملية جراحية بسيطة.' },
  { id: 2, name: 'سامي خالد', room: 'ICU1', condition: 'حرجة', details: 'مريض في العناية المركزة، يحتاج مراقبة مستمرة.' },
  { id: 3, name: 'ليلى فادي', room: 'PED3', condition: 'مستقرة', details: 'طفلة تعاني من نزلة برد موسمية.' },
];

const NursePatients = () => {
  const [patients, setPatients] = useState(initialNursePatients);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [newPatientData, setNewPatientData] = useState({ name: '', room: '', condition: '', details: '' });

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedPatient(null);
    setShowPatientDetails(false);
  };

  const handleAddPatient = () => {
    setNewPatientData({ name: '', room: '', condition: '', details: '' });
    setShowAddPatientForm(true);
  };

  const handleSaveNewPatient = (e) => {
    e.preventDefault();
    if (newPatientData.name && newPatientData.room && newPatientData.condition) {
      setPatients([...patients, { ...newPatientData, id: Date.now() }]);
      setNewPatientData({ name: '', room: '', condition: '', details: '' });
      setShowAddPatientForm(false);
      alert('تم إضافة مريض جديد بنجاح.');
    } else {
      alert('يرجى ملء جميع الحقول المطلوبة.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">المرضى</h3>

      <div className="mb-8">
        <button
          onClick={handleAddPatient}
          className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="ml-2" />
          إضافة مريض جديد
        </button>
      </div>

      {showAddPatientForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">إضافة مريض جديد</h4>
          <form onSubmit={handleSaveNewPatient} className="space-y-4">
            <div>
              <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">اسم المريض</label>
              <input type="text" id="patientName" name="name" value={newPatientData.name} onChange={(e) => setNewPatientData({ ...newPatientData, name: e.target.value })} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="patientRoom" className="block text-gray-700 text-sm font-bold mb-2">رقم الغرفة</label>
              <input type="text" id="patientRoom" name="room" value={newPatientData.room} onChange={(e) => setNewPatientData({ ...newPatientData, room: e.target.value })} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="patientCondition" className="block text-gray-700 text-sm font-bold mb-2">الحالة</label>
              <input type="text" id="patientCondition" name="condition" value={newPatientData.condition} onChange={(e) => setNewPatientData({ ...newPatientData, condition: e.target.value })} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="patientDetails" className="block text-gray-700 text-sm font-bold mb-2">تفاصيل إضافية</label>
              <textarea id="patientDetails" name="details" value={newPatientData.details} onChange={(e) => setNewPatientData({ ...newPatientData, details: e.target.value })} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
            </div>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
              >
                حفظ المريض
              </button>
              <button
                type="button"
                onClick={() => setShowAddPatientForm(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      <h4 className="text-xl font-semibold text-gray-700 mb-4 mt-8">المرضى الحاليون</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">اسم المريض</th>
              <th className="py-3 px-6 text-right">الغرفة</th>
              <th className="py-3 px-6 text-right">الحالة</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {patients.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-500">لا توجد مرضى حالياً.</td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right whitespace-nowrap">{patient.name}</td>
                  <td className="py-3 px-6 text-right">{patient.room}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      patient.condition === 'مستقرة' ? 'bg-green-200 text-green-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {patient.condition}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetails(patient)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                      title="عرض التفاصيل"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Patient Details Modal */}
      {showPatientDetails && selectedPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-right relative">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">تفاصيل المريض: {selectedPatient.name}</h4>
            <p className="mb-2"><strong className="font-medium">الغرفة:</strong> {selectedPatient.room}</p>
            <p className="mb-2"><strong className="font-medium">الحالة:</strong> {selectedPatient.condition}</p>
            <p className="mb-4"><strong className="font-medium">تفاصيل:</strong> {selectedPatient.details}</p>
            <button
              onClick={handleCloseDetails}
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

export default NursePatients;
