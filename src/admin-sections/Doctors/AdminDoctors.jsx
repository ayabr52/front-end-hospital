// src/admin-sections/Doctors/AdminDoctors.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DoctorsList from './DoctorsList';
import DoctorForm from './DoctorForm';

const initialDoctors = [
  {
    id: 1, first_name: 'جهاد', last_name: 'موصلي', email: 'jihad.m@example.com', password: 'hashed_password',
    address: 'دمشق', gender: 'ذكر', mobile: '0987654321', department_id: 'جراحة', specialty_id: 'جراحة عامة',
    rating: 'محترف', description: 'طبيب جراح ذو خبرة واسعة.', birth_date: '1975-01-15', hire_date: '2000-03-01',
    image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+1'
  },
  {
    id: 2, first_name: 'لما', last_name: 'قيسون', email: 'lama.k@example.com', password: 'hashed_password',
    address: 'حمص', gender: 'أنثى', mobile: '0998765432', department_id: 'نسائية', specialty_id: 'نسائية وتوليد',
    rating: 'خبير', description: 'أخصائية نسائية وتوليد.', birth_date: '1980-05-20', hire_date: '2005-07-10',
    image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+2'
  },
  {
    id: 3, first_name: 'أغيد', last_name: 'السلام', email: 'aghid.s@example.com', password: 'hashed_password',
    address: 'حلب', gender: 'ذكر', mobile: '0912345678', department_id: 'داخلية', specialty_id: 'قلبية',
    rating: 'متوسط', description: 'طبيب قلبية.', birth_date: '1988-11-01', hire_date: '2015-09-01',
    image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Doctor+3'
  },
];

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedDoctor, setSelectedDoctor] = useState(null); // للطبيب الذي يتم تعديله

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setViewMode('add');
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setViewMode('edit');
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الطبيب؟')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  const handleSaveDoctor = (doctorData) => {
    if (doctorData.id && doctors.some(d => d.id === doctorData.id)) {
      // تعديل طبيب موجود
      setDoctors(doctors.map(doctor =>
        doctor.id === doctorData.id ? doctorData : doctor
      ));
    } else {
      // إضافة طبيب جديد
      setDoctors([...doctors, { ...doctorData, id: Date.now() }]);
    }
    setViewMode('list');
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedDoctor(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">إدارة الأطباء</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddDoctor}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إضافة طبيب
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <DoctorsList
          doctors={doctors}
          onEdit={handleEditDoctor}
          onDelete={handleDeleteDoctor}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <DoctorForm
          doctorToEdit={selectedDoctor}
          onSave={handleSaveDoctor}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminDoctors;
