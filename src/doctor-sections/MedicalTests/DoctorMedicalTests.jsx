// src/doctor-sections/MedicalTests/DoctorMedicalTests.jsx
import React, { useState } from 'react';
import { Plus, Edit, FileText, Trash2 } from 'lucide-react'; // Added Trash2 for delete icon

const initialMedicalTests = [
  {
    id: 1, patientName: 'علياء محمود', date: '2025-07-25',
    temperature: '37.2°C', heartRate: '78 نبضة/دقيقة', respirationRate: '16 نفس/دقيقة',
    prescription: 'مسكنات ألم، مضاد التهاب', notes: 'فحص روتيني، حالة مستقرة.'
  },
  {
    id: 2, patientName: 'سامي خالد', date: '2025-07-28',
    temperature: '36.9°C', heartRate: '82 نبضة/دقيقة', respirationRate: '17 نفس/دقيقة',
    prescription: 'فيتامينات متعددة', notes: 'متابعة بعد عملية جراحية بسيطة.'
  },
];

const DoctorMedicalTests = () => {
  const [medicalTests, setMedicalTests] = useState(initialMedicalTests);
  const [showForm, setShowForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '', date: '', temperature: '', heartRate: '', respirationRate: '',
    prescription: '', notes: ''
  });

  const handleAddTest = () => {
    setSelectedTest(null);
    setFormData({ patientName: '', date: '', temperature: '', heartRate: '', respirationRate: '', prescription: '', notes: '' });
    setShowForm(true);
  };

  const handleEditTest = (test) => {
    setSelectedTest(test);
    setFormData(test);
    setShowForm(true);
  };

  const handleDeleteTest = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الاختبار الطبي؟')) {
      setMedicalTests(medicalTests.filter(test => test.id !== id));
    }
  };

  const handleSaveTest = (e) => {
    e.preventDefault();
    if (selectedTest) {
      setMedicalTests(medicalTests.map(test =>
        test.id === selectedTest.id ? { ...formData, id: selectedTest.id } : test
      ));
    } else {
      setMedicalTests([...medicalTests, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedTest(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة الاختبارات الطبية</h3>

      <div className="mb-8">
        <button
          onClick={handleAddTest}
          className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="ml-2" />
          إضافة اختبار طبي جديد
        </button>
      </div>

      {showForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedTest ? 'تعديل اختبار طبي' : 'إضافة اختبار طبي جديد'}
          </h4>
          <form onSubmit={handleSaveTest} className="space-y-4">
            <div>
              <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">اسم المريض</label>
              <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">التاريخ</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="temperature" className="block text-gray-700 text-sm font-bold mb-2">درجة الحرارة</label>
                <input type="text" id="temperature" name="temperature" value={formData.temperature} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
              </div>
              <div>
                <label htmlFor="heartRate" className="block text-gray-700 text-sm font-bold mb-2">معدل ضربات القلب</label>
                <input type="text" id="heartRate" name="heartRate" value={formData.heartRate} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
              </div>
              <div>
                <label htmlFor="respirationRate" className="block text-gray-700 text-sm font-bold mb-2">معدل التنفس</label>
                <input type="text" id="respirationRate" name="respirationRate" value={formData.respirationRate} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
              </div>
            </div>
            <div>
              <label htmlFor="prescription" className="block text-gray-700 text-sm font-bold mb-2">وصفة طبية</label>
              <textarea id="prescription" name="prescription" value={formData.prescription} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
            </div>
            <div>
              <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">ملاحظات طبية</label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
            </div>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                {selectedTest ? 'حفظ التعديلات' : 'إضافة'}
              </button>
              <button
                type="button"
                onClick={handleCancelForm}
                className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      <h4 className="text-xl font-semibold text-gray-700 mb-4 mt-8">الاختبارات الطبية المسجلة</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">اسم المريض</th>
              <th className="py-3 px-6 text-right">التاريخ</th>
              <th className="py-3 px-6 text-right">الحرارة</th>
              <th className="py-3 px-6 text-right">معدل القلب</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {medicalTests.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">لا توجد اختبارات طبية مسجلة حالياً.</td>
              </tr>
            ) : (
              medicalTests.map((test) => (
                <tr key={test.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right whitespace-nowrap">{test.patientName}</td>
                  <td className="py-3 px-6 text-right">{test.date}</td>
                  <td className="py-3 px-6 text-right">{test.temperature}</td>
                  <td className="py-3 px-6 text-right">{test.heartRate}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <div className="flex item-center justify-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleEditTest(test)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                        title="تعديل الاختبار"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTest(test.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                        title="حذف الاختبار"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorMedicalTests;
