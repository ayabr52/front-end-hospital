// src/admin-sections/Departments/AdminDepartments.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DepartmentsList from './DepartmentsList';
import DepartmentForm from './DepartmentForm';
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from '../../services/DepartmentService'; // استيراد خدمات الأقسام

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedDepartment, setSelectedDepartment] = useState(null); // للقسم الذي يتم تعديله
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الأخطاء

  // دالة لجلب الأقسام من الـ API
  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      setError('فشل في جلب الأقسام: ' + (err.response?.data?.message || err.message));
      console.error('Failed to fetch departments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments(); // جلب الأقسام عند تحميل المكون
  }, []);

  const handleAddDepartment = () => {
    setSelectedDepartment(null); // للتأكد من أن النموذج فارغ للإضافة
    setViewMode('add');
  };

  const handleEditDepartment = (dept) => {
    setSelectedDepartment(dept);
    setViewMode('edit');
  };

  const handleDeleteDepartment = async (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا القسم؟')) {
      try {
        await deleteDepartment(id);
        alert('تم حذف القسم بنجاح.');
        fetchDepartments(); // إعادة جلب الأقسام بعد الحذف
      } catch (err) {
        alert('فشل في حذف القسم: ' + (err.response?.data?.message || err.message));
        console.error('Failed to delete department:', err);
      }
    }
  };

  const handleSaveDepartment = async (departmentData) => {
    setError(null);
    try {
      if (departmentData.id && departments.some(d => d.id === departmentData.id)) {
        // تعديل قسم موجود
        await updateDepartment(departmentData.id, {
          name: departmentData.name,
          description: departmentData.description,
          specialty: departmentData.specialty,
        });
        alert('تم تحديث القسم بنجاح.');
      } else {
        // إضافة قسم جديد
        await addDepartment({
          name: departmentData.name,
          description: departmentData.description,
          specialty: departmentData.specialty,
        });
        alert('تم إضافة القسم بنجاح.');
      }
      setViewMode('list'); // العودة إلى عرض القائمة
      fetchDepartments(); // إعادة جلب الأقسام بعد الحفظ
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      const validationErrors = err.response?.data?.errors;
      let fullErrorMessage = errorMessage;
      if (validationErrors) {
        fullErrorMessage += '\n' + Object.values(validationErrors).map(e => e.join(', ')).join('\n');
      }
      alert('فشل في حفظ القسم: ' + fullErrorMessage);
      console.error('Failed to save department:', err);
    }
  };

  const handleCancelForm = () => {
    setViewMode('list'); // العودة إلى عرض القائمة
    setSelectedDepartment(null);
    setError(null); // مسح الأخطاء عند الإلغاء
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-600 text-lg">جاري تحميل الأقسام...</p>
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
        <h3 className="text-2xl font-semibold text-gray-800">إدارة الأقسام</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddDepartment}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إضافة قسم
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <DepartmentsList
          departments={departments}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteDepartment}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <DepartmentForm
          departmentToEdit={selectedDepartment}
          onSave={handleSaveDepartment}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminDepartments;
