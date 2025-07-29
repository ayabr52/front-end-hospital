// src/admin-sections/Pharmacy/AdminPharmacy.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MedicinesList from './MedicinesList';
import MedicineForm from './MedicineForm';

const initialMedicines = [
  { id: 1, name: 'باراسيتامول', quantity: 100, price: 5.50, expiry_date: '2025-12-31', description: 'مسكن للألم وخافض للحرارة.' },
  { id: 2, name: 'أموكسيسيلين', quantity: 50, price: 12.00, expiry_date: '2024-11-01', description: 'مضاد حيوي واسع الطيف.' },
  { id: 3, name: 'فيتامين سي', quantity: 200, price: 3.25, expiry_date: '2026-06-30', description: 'مكمل غذائي لتقوية المناعة.' },
];

const AdminPharmacy = () => {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleAddMedicine = () => {
    setSelectedMedicine(null);
    setViewMode('add');
  };

  const handleEditMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setViewMode('edit');
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الدواء؟')) {
      setMedicines(medicines.filter(medicine => medicine.id !== id));
    }
  };

  const handleSaveMedicine = (medicineData) => {
    if (medicineData.id && medicines.some(m => m.id === medicineData.id)) {
      // تعديل دواء موجود
      setMedicines(medicines.map(medicine =>
        medicine.id === medicineData.id ? medicineData : medicine
      ));
    } else {
      // إضافة دواء جديد
      setMedicines([...medicines, { ...medicineData, id: Date.now() }]);
    }
    setViewMode('list');
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedMedicine(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-right">إدارة الصيدلية</h3>

      {/* قسم تعيين مسؤول الصيدلية (placeholder) */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-right">
        <h4 className="text-xl font-semibold text-blue-700 mb-4">تعيين مسؤول الصيدلية</h4>
        <p className="text-gray-700 mb-4">
          هنا يمكنك تحديد المستخدم الذي سيكون مسؤول الصيدلية. في التطبيق الحقيقي، سيكون هذا اختيارًا من قائمة المستخدمين الموجودين.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
          تعيين مسؤول
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">إدارة الأدوية</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddMedicine}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إضافة دواء
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <MedicinesList
          medicines={medicines}
          onEdit={handleEditMedicine}
          onDelete={handleDeleteMedicine}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <MedicineForm
          medicineToEdit={selectedMedicine}
          onSave={handleSaveMedicine}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminPharmacy;
