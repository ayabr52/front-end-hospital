// src/admin-sections/Departments/AdminDepartments.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DepartmentsList from './DepartmentsList';
import DepartmentForm from './DepartmentForm';

const initialDepartments = [
  { id: 1, name: 'النسائية والتوليد', description: 'قسم النسائية والتوليد', specialty: 'جراحة', createdAt: '2024-10-15' },
  { id: 2, name: 'القسطرة وجراحة القلب', description: 'قسم القسطرة وجراحة القلب', specialty: 'جراحة', createdAt: '2024-10-15' },
  { id: 3, name: 'التجميل والجراحة التجميلية', description: 'قسم التجميل والجراحة التجميلية', specialty: 'جراحة', createdAt: '2024-10-15' },
  { id: 4, name: 'البولية', description: 'قسم البولية', specialty: 'داخلية', createdAt: '2024-10-15' },
  { id: 5, name: 'الهضمية', description: 'قسم الهضمية والأمراض الداخلية', specialty: 'داخلية', createdAt: '2024-10-15' },
  { id: 6, name: 'العظمية', description: 'قسم العظمية وأمراض المفاصل', specialty: 'داخلية', createdAt: '2024-10-15' },
  { id: 7, name: 'العينية', description: 'قسم العمليات والجراحات العينية', specialty: 'جراحة', createdAt: '2024-10-15' },
  { id: 8, name: 'الجلدية', description: 'قسم الأمراض الجلدية والتناسلية', specialty: 'جلدية', createdAt: '2024-10-15' },
];

const AdminDepartments = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedDepartment, setSelectedDepartment] = useState(null); // للقسم الذي يتم تعديله

  const handleAddDepartment = () => {
    setSelectedDepartment(null); // للتأكد من أن النموذج فارغ للإضافة
    setViewMode('add');
  };

  const handleEditDepartment = (dept) => {
    setSelectedDepartment(dept);
    setViewMode('edit');
  };

  const handleDeleteDepartment = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا القسم؟')) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  const handleSaveDepartment = (departmentData) => {
    if (departmentData.id && departments.some(d => d.id === departmentData.id)) {
      // تعديل قسم موجود
      setDepartments(departments.map(dept =>
        dept.id === departmentData.id ? departmentData : dept
      ));
    } else {
      // إضافة قسم جديد
      setDepartments([...departments, { ...departmentData, id: Date.now() }]); // معرف مؤقت جديد
    }
    setViewMode('list'); // العودة إلى عرض القائمة
  };

  const handleCancelForm = () => {
    setViewMode('list'); // العودة إلى عرض القائمة
    setSelectedDepartment(null);
  };

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
