// src/pharmacist-sections/Prescriptions/PharmacistPrescriptions.jsx
import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, Pill } from 'lucide-react';

const initialPrescriptions = [
  {
    id: 1,
    patientName: 'علياء محمود',
    doctorName: 'د. جهاد موصلي',
    date: '2025-07-25',
    status: 'معلقة', // 'معلقة', 'صُرفت', 'مرفوضة'
    medicines: [
      { name: 'باراسيتامول', dosage: '500mg', quantity: 2, instructions: 'حبة كل 8 ساعات' },
      { name: 'فيتامين د', dosage: '1000IU', quantity: 1, instructions: 'حبة يومياً' },
    ],
    notes: 'وصفة لدواء مسكن ومكمل فيتامينات.',
  },
  {
    id: 2,
    patientName: 'سامي خالد',
    doctorName: 'د. أغيد السلام',
    date: '2025-07-20',
    status: 'صُرفت',
    medicines: [
      { name: 'أموكسيسيلين', dosage: '250mg', quantity: 1, instructions: 'كبسولة كل 12 ساعة' },
    ],
    notes: 'وصفة لمضاد حيوي بعد العملية.',
  },
];

const PharmacistPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const handleDispense = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد صرف هذه الوصفة؟')) {
      setPrescriptions(prescriptions.map(p =>
        p.id === id ? { ...p, status: 'صُرفت' } : p
      ));
      alert('تم صرف الوصفة بنجاح.');
    }
  };

  const handleReject = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد رفض هذه الوصفة؟')) {
      setPrescriptions(prescriptions.map(p =>
        p.id === id ? { ...p, status: 'مرفوضة' } : p
      ));
      alert('تم رفض الوصفة.');
    }
  };

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedPrescription(null);
    setShowDetailsModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة الوصفات الطبية</h3>

      <h4 className="text-xl font-semibold text-gray-700 mb-4">قائمة الوصفات</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">رقم الوصفة</th>
              <th className="py-3 px-6 text-right">اسم المريض</th>
              <th className="py-3 px-6 text-right">اسم الطبيب</th>
              <th className="py-3 px-6 text-right">التاريخ</th>
              <th className="py-3 px-6 text-right">الحالة</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {prescriptions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">لا توجد وصفات طبية حالياً.</td>
              </tr>
            ) : (
              prescriptions.map((p) => (
                <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right whitespace-nowrap">{p.id}</td>
                  <td className="py-3 px-6 text-right">{p.patientName}</td>
                  <td className="py-3 px-6 text-right">{p.doctorName}</td>
                  <td className="py-3 px-6 text-right">{p.date}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      p.status === 'صُرفت' ? 'bg-green-200 text-green-800' :
                      p.status === 'مرفوضة' ? 'bg-red-200 text-red-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <div className="flex item-center justify-center gap-4">
                      <button
                        onClick={() => handleViewDetails(p)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
                        title="عرض التفاصيل"
                      >
                        <Eye size={16} />
                      </button>
                      {p.status === 'معلقة' && (
                        <>
                          <button
                            onClick={() => handleDispense(p.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                            title="صرف الوصفة"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(p.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            title="رفض الوصفة"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Prescription Details Modal */}
      {showDetailsModal && selectedPrescription && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-right relative">
            <h4 className="text-2xl font-semibold text-gray-800 mb-6">تفاصيل الوصفة الطبية</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <p><strong>رقم الوصفة:</strong> {selectedPrescription.id}</p>
              <p><strong>اسم المريض:</strong> {selectedPrescription.patientName}</p>
              <p><strong>اسم الطبيب:</strong> {selectedPrescription.doctorName}</p>
              <p><strong>التاريخ:</strong> {selectedPrescription.date}</p>
              <p><strong>الحالة:</strong> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedPrescription.status === 'صُرفت' ? 'bg-green-200 text-green-800' :
                  selectedPrescription.status === 'مرفوضة' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>{selectedPrescription.status}</span></p>
            </div>

            <h5 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <Pill size={20} className="ml-2" />
              الأدوية:
            </h5>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                    <th className="py-2 px-4 text-right">الدواء</th>
                    <th className="py-2 px-4 text-right">الجرعة</th>
                    <th className="py-2 px-4 text-right">الكمية</th>
                    <th className="py-2 px-4 text-right">التعليمات</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {selectedPrescription.medicines.map((med, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 px-4 text-right">{med.name}</td>
                      <td className="py-2 px-4 text-right">{med.dosage}</td>
                      <td className="py-2 px-4 text-right">{med.quantity}</td>
                      <td className="py-2 px-4 text-right">{med.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mb-6"><strong>ملاحظات:</strong> {selectedPrescription.notes || 'لا توجد ملاحظات.'}</p>

            <div className="flex justify-end">
              <button
                onClick={handleCloseDetailsModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacistPrescriptions;
