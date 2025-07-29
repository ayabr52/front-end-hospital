// src/admin-sections/Nurses/AdminNurses.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import NursesList from './NursesList';
import NurseForm from './NurseForm';

const initialNurses = [
  {
    id: 1, first_name: 'سارة', last_name: 'علي', email: 'sara.a@example.com', password: 'hashed_password',
    address: 'دمشق', gender: 'أنثى', mobile: '0933445566', department_id: 'العناية المركزة', specialty_id: 'تمريض عناية مركزة',
    description: 'ممرضة عناية مركزة.', birth_date: '1992-02-28', hire_date: '2018-04-10',
    image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Nurse+1'
  },
  {
    id: 2, first_name: 'خالد', last_name: 'محمد', email: 'khalid.m@example.com', password: 'hashed_password',
    address: 'حمص', gender: 'ذكر', mobile: '0944556677', department_id: 'النسائية والتوليد', specialty_id: 'تمريض عام',
    description: 'ممرض عام.', birth_date: '1990-08-12', hire_date: '2016-01-01',
    image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Nurse+2'
  },
];

const AdminNurses = () => {
  const [nurses, setNurses] = useState(initialNurses);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedNurse, setSelectedNurse] = useState(null);

  const handleAddNurse = () => {
    setSelectedNurse(null);
    setViewMode('add');
  };

  const handleEditNurse = (nurse) => {
    setSelectedNurse(nurse);
    setViewMode('edit');
  };

  const handleDeleteNurse = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الممرض؟')) {
      setNurses(nurses.filter(nurse => nurse.id !== id));
    }
  };

  const handleSaveNurse = (nurseData) => {
    if (nurseData.id && nurses.some(n => n.id === nurseData.id)) {
      // تعديل ممرض موجود
      setNurses(nurses.map(nurse =>
        nurse.id === nurseData.id ? nurseData : nurse
      ));
    } else {
      // إضافة ممرض جديد
      setNurses([...nurses, { ...nurseData, id: Date.now() }]);
    }
    setViewMode('list');
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedNurse(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">إدارة الممرضين</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddNurse}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إضافة ممرض
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <NursesList
          nurses={nurses}
          onEdit={handleEditNurse}
          onDelete={handleDeleteNurse}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <NurseForm
          nurseToEdit={selectedNurse}
          onSave={handleSaveNurse}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminNurses;
