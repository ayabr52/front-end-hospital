// src/admin-sections/Patients/AdminPatients.jsx
import React, { useState } from 'react';
import PatientsList from './PatientsList';

const initialPatients = [
  {
    id: 1, full_name: 'علياء محمود', email: 'alya.m@example.com', password: 'hashed_password',
    mobile: '0912345678', address: 'دمشق', gender: 'أنثى', national_id: '1234567890',
    birth_date: '1990-03-10', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Patient+1', status: 'بانتظار القبول'
  },
  {
    id: 2, full_name: 'سامي خالد', email: 'sami.k@example.com', password: 'hashed_password',
    mobile: '0998765432', address: 'حمص', gender: 'ذكر', national_id: '0987654321',
    birth_date: '1985-07-22', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Patient+2', status: 'مقبول'
  },
  {
    id: 3, full_name: 'ليلى فادي', email: 'layla.f@example.com', password: 'hashed_password',
    mobile: '0911223344', address: 'حلب', gender: 'أنثى', national_id: '1122334455',
    birth_date: '1995-01-05', image: 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=Patient+3', status: 'مرفوض'
  },
];

const AdminPatients = () => {
  const [patients, setPatients] = useState(initialPatients);

  const handleAcceptPatient = (id) => {
    setPatients(patients.map(patient =>
      patient.id === id ? { ...patient, status: 'مقبول' } : patient
    ));
  };

  const handleRejectPatient = (id) => {
    setPatients(patients.map(patient =>
      patient.id === id ? { ...patient, status: 'مرفوض' } : patient
    ));
  };

  const handleDeletePatient = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المريض؟')) {
      setPatients(patients.filter(patient => patient.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-right">إدارة المرضى</h3>
      <PatientsList
        patients={patients}
        onAccept={handleAcceptPatient}
        onReject={handleRejectPatient}
        onDelete={handleDeletePatient}
      />
    </div>
  );
};

export default AdminPatients;
