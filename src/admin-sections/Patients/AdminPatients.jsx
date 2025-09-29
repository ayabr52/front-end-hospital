// src/admin-sections/Patients/AdminPatients.jsx
// هذا الملف لم يتغير، لكنه مدرج هنا للتوضيح.
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import PatientsList from './PatientsList';
import PatientForm from './PatientForm';
import { getPatients, addPatient, updatePatient, deletePatient } from '../../services/PatientService';

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedPatient, setSelectedPatient] = useState(null); // للمريض الذي يتم تعديله
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الأخطاء

  // دالة لجلب المرضى من الـ API
  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError('فشل في جلب المرضى: ' + (err.response?.data?.message || err.message));
      console.error('Failed to fetch patients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients(); // جلب المرضى عند تحميل المكون
  }, []);

  const handleAddPatient = () => {
    setSelectedPatient(null); // للتأكد من أن النموذج فارغ للإضافة
    setViewMode('add');
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setViewMode('edit');
  };

  const handleDeletePatient = async (id) => {
    // استخدام رسالة مخصصة بدلاً من window.confirm
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المريض؟')) { // Placeholder for custom modal
      try {
        await deletePatient(id);
        alert('تم حذف المريض بنجاح.'); // Placeholder for custom message box
        fetchPatients(); // إعادة جلب المرضى بعد الحذف
      } catch (err) {
        alert('فشل في حذف المريض: ' + (err.response?.data?.message || err.message)); // Placeholder for custom message box
        console.error('Failed to delete patient:', err);
      }
    }
  };

  const handleSavePatient = async (patientData) => {
    setError(null);
    try {
      if (patientData.id && patients.some(p => p.id === patientData.id)) {
        // تعديل مريض موجود
        await updatePatient(patientData.id, patientData);
        alert('تم تحديث بيانات المريض بنجاح.'); // Placeholder for custom message box
      } else {
        // إضافة مريض جديد
        await addPatient(patientData);
        alert('تم إضافة المريض بنجاح.'); // Placeholder for custom message box
      }
      setViewMode('list'); // العودة إلى عرض القائمة
      fetchPatients(); // إعادة جلب المرضى بعد الحفظ
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      const validationErrors = err.response?.data?.errors;
      let fullErrorMessage = errorMessage;
      if (validationErrors) {
        fullErrorMessage += '\n' + Object.values(validationErrors).map(e => e.join(', ')).join('\n');
      }
      alert('فشل في حفظ المريض: ' + fullErrorMessage); // Placeholder for custom message box
      console.error('Failed to save patient:', err);
    }
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedPatient(null);
    setError(null); // مسح الأخطاء عند الإلغاء
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-600 text-lg">جاري تحميل المرضى...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">خطأ!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">إدارة المرضى</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddPatient}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إضافة مريض
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <PatientsList
          patients={patients}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <PatientForm
          patient={selectedPatient}
          onSubmit={handleSavePatient}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminPatients;
