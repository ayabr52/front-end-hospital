// src/patient-sections/MedicalFile/PatientMedicalFile.jsx
import React from 'react';
import { FileText, HeartPulse, Thermometer, Stethoscope } from 'lucide-react';

const patientMedicalData = {
  fullName: 'علياء محمود',
  nationalId: '1234567890',
  birthDate: '1990-03-10',
  gender: 'أنثى',
  bloodGroup: 'A+',
  allergies: ['البنسلين'],
  chronicDiseases: ['السكري (النوع 2)'],
  pastSurgeries: ['استئصال الزائدة الدودية (2015)'],
  tests: [
    { id: 1, date: '2025-07-01', doctor: 'د. أغيد السلام', type: 'فحص عام', temperature: '37.2°C', heartRate: '78 نبضة/دقيقة', respirationRate: '16 نفس/دقيقة', prescription: 'مسكنات ألم، مضاد التهاب', notes: 'فحص روتيني، حالة مستقرة.' },
    { id: 2, date: '2025-06-15', doctor: 'د. لما قيسون', type: 'فحص نسائي', temperature: '36.8°C', heartRate: '75 نبضة/دقيقة', respirationRate: '18 نفس/دقيقة', prescription: 'فيتامينات', notes: 'متابعة دورية.' },
  ],
};

const PatientMedicalFile = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">ملفي الطبي</h3>

      <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-blue-50">
        <h4 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <FileText size={24} className="ml-2" />
          معلومات المريض الأساسية
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><strong>الاسم الكامل:</strong> {patientMedicalData.fullName}</p>
          <p><strong>الرقم الوطني:</strong> {patientMedicalData.nationalId}</p>
          <p><strong>تاريخ الميلاد:</strong> {patientMedicalData.birthDate}</p>
          <p><strong>الجنس:</strong> {patientMedicalData.gender}</p>
          <p><strong>فصيلة الدم:</strong> {patientMedicalData.bloodGroup}</p>
          <p><strong>الحساسيات:</strong> {patientMedicalData.allergies.join(', ') || 'لا توجد'}</p>
          <p><strong>الأمراض المزمنة:</strong> {patientMedicalData.chronicDiseases.join(', ') || 'لا توجد'}</p>
          <p><strong>العمليات السابقة:</strong> {patientMedicalData.pastSurgeries.join(', ') || 'لا توجد'}</p>
        </div>
      </div>

      <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        <Stethoscope size={24} className="ml-2" />
        الاختبارات والفحوصات
      </h4>
      {patientMedicalData.tests.length === 0 ? (
        <p className="text-gray-500 text-center py-4">لا توجد اختبارات أو فحوصات مسجلة حالياً.</p>
      ) : (
        <div className="space-y-6">
          {patientMedicalData.tests.map(test => (
            <div key={test.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">تاريخ: {test.date}</p>
                <p className="text-sm text-gray-600">الطبيب: {test.doctor}</p>
              </div>
              <p className="text-gray-700 mb-2"><strong>نوع الفحص:</strong> {test.type}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mb-2">
                <p className="flex items-center"><Thermometer size={16} className="ml-1 text-red-500" /> <strong>الحرارة:</strong> {test.temperature}</p>
                <p className="flex items-center"><HeartPulse size={16} className="ml-1 text-blue-500" /> <strong>معدل القلب:</strong> {test.heartRate}</p>
                <p className="flex items-center"><Stethoscope size={16} className="ml-1 text-green-500" /> <strong>معدل التنفس:</strong> {test.respirationRate}</p>
              </div>
              <p className="text-gray-700 mb-2"><strong>الوصفة الطبية:</strong> {test.prescription || 'لا توجد'}</p>
              <p className="text-gray-700"><strong>ملاحظات:</strong> {test.notes || 'لا توجد'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientMedicalFile;
