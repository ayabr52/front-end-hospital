// src/pharmacist-sections/Prescriptions/PharmacistPrescriptions.jsx
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Eye, Pill, Loader, Plus } from 'lucide-react';
import { usePrescriptions } from '../../hooks/usePrescriptions';
import Skeleton from 'react-loading-skeleton';
import { addMedicalRecord, getDoctors, getPatients, updateMedicalRecord } from '../../services/api-service';


const PharmacistPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const { error, getPrescriptions, isLoading } = usePrescriptions()
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [message, setMessage] = useState('');
  const [patients, setPatients] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errorData, setErrorData] = useState(null);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    record_date: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    medication: '',
    instructions: '',
    dosage: '',
  });
  useEffect(() => {
    const handleGetNotification = async () => {
      const resPrescriptions = await getPrescriptions()
      console.log(resPrescriptions);
      if (resPrescriptions.status === 'success') {
        setPrescriptions(resPrescriptions.prescriptions)

      }
    }
    handleGetNotification()
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        // const fetchedPatients = await getPatients()

        // setPatients(fetchedPatients);
        setErrorData(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setErrorData('حدث خطأ أثناء جلب البيانات. يرجى التحقق من اتصالك بالإنترنت أو إعدادات الـ API.');
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();

  }, []);
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

  const handleAddRecord = () => {
    setSelectedRecord(null);
    setFormData({
        patient_id: '',
        doctor_id: '',
        record_date: new Date().toISOString().split('T')[0],
        diagnosis: '',
        treatment: '',
        medication: '',
        instructions: '',
        dosage: '',
        notes: ''
    });
    setShowForm(true);
};
  const handleSaveRecord = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      let result;
      // إزالة الحقول غير المستخدمة قبل الإرسال
      const dataToSend = {
        patient_id: formData.patient_id,
        record_date: formData.record_date,
        diagnosis: formData.diagnosis,
        treatment: formData.treatment,
        notes: formData.notes,
        medication: formData.medication,
        instructions: formData.instructions,
        dosage: formData.dosage,
        doctor_id: formData.doctor_id,
      };

      if (selectedRecord) {
        result = await updateMedicalRecord(selectedRecord.id, dataToSend); // 👈 تم التعديل لإرسال البيانات الجديدة
        setPrescriptions(prescriptions.map(rec =>
          rec.id === selectedRecord.id ? result : rec
        ));
        setMessage('تم تحديث السجل الطبي بنجاح.');
      } else {
        result = await addMedicalRecord(dataToSend); // 👈 تم التعديل لإرسال البيانات الجديدة
        setPrescriptions([...prescriptions, result]);
        setMessage('تم إضافة سجل طبي جديد بنجاح.');
      }
      setShowForm(false);
    } catch (err) {
      console.error('Failed to save medical record:', err);
      setMessage('حدث خطأ أثناء حفظ السجل الطبي.');
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedRecord(null);
  };
  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <Loader className="animate-spin text-blue-500 ml-2" size={24} />
        <span className="text-gray-600">جارٍ تحميل السجلات الطبية...</span>
      </div>
    );
  }
  if (errorData) {
    return (
      <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        <Info className="flex-shrink-0 inline w-4 h-4 ml-3" />
        <div>{errorData}</div>
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة الوصفات الطبية</h3>

      {message && (
        <div className="flex items-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          <Info className="flex-shrink-0 inline w-4 h-4 ml-3" />
          <div>{message}</div>
        </div>
      )}
      <h4 className="text-xl font-semibold text-gray-700 mb-4">قائمة الوصفات</h4>
      <div className="mb-8">
        <button
          onClick={handleAddRecord}
          className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="ml-2" />
          إضافة سجل طبي جديد
        </button>
      </div>
      {showForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedRecord ? 'تعديل سجل طبي' : 'إضافة سجل طبي جديد'}
          </h4>
          <form onSubmit={handleSaveRecord} className="space-y-4">
            <div>
              <label htmlFor="patient_id" className="block text-gray-700 text-sm font-bold mb-2">اسم المريض</label>
              <select
                id="patient_id"
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                required
              >
                <option value="" disabled>اختر مريضًا...</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="record_date" className="block text-gray-700 text-sm font-bold mb-2">التاريخ</label>
              <input type="date" id="record_date" name="record_date" value={formData.record_date} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>

            {/* 👈 تم استبدال حقول القياسات الحيوية بحقلين جديدين */}
            <div>
              <label htmlFor="diagnosis" className="block text-gray-700 text-sm font-bold mb-2">التشخيص</label>
              <input type="text" id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="treatment" className="block text-gray-700 text-sm font-bold mb-2">العلاج</label>
              <textarea id="treatment" name="treatment" value={formData.treatment} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none" required></textarea>
            </div>

            <div>
              <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">ملاحظات طبية</label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
            </div>
            <div>
              <label htmlFor="medication" className="block text-gray-700 text-sm font-bold mb-2">الدواء</label>
              <input type="text" id="medication" name="medication" value={formData.medication} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="dosage" className="block text-gray-700 text-sm font-bold mb-2">الجرعة</label>
              <input type="text" id="dosage" name="dosage" value={formData.dosage} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">الأستعمال
              </label>
              <input type="text" id="instructions" name="instructions" value={formData.instructions} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                {selectedRecord ? 'حفظ التعديلات' : 'إضافة'}
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
            {
              isLoading ?
                <>
                  <tr>
                    <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                      <Skeleton borderRadius={8} direction='200' enableAnimation height={8} className='w-full py-6' />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                      <Skeleton borderRadius={8} direction='200' enableAnimation height={8} className='w-full py-6' />
                    </td>
                  </tr>
                </>
                :
                prescriptions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 px-6 text-center text-gray-500">لا توجد وصفات طبية حالياً.</td>
                  </tr>
                ) : (
                  prescriptions.map((p) => {
                    return <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-right whitespace-nowrap">{p.id}</td>
                      <td className="py-3 px-6 text-right">{p.patient.name}</td>
                      <td className="py-3 px-6 text-right">{p.doctor.name}</td>
                      <td className="py-3 px-6 text-right">{p.prescription_date.split('T')[0]}</td>
                      <td className="py-3 px-6 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold  ${p.status === 'صُرفت' ? 'bg-green-200 text-green-800' :
                          p.status === 'مرفوضة' ? 'bg-red-200 text-red-800' :
                            'bg-green-200 text-green-800 '
                          }`}>
                          صُرفت
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
                  })
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
              <p><strong>اسم المريض:</strong> {selectedPrescription.patient.name}</p>
              <p><strong>اسم الطبيب:</strong> {selectedPrescription.doctor.name}</p>
              <p><strong>التاريخ:</strong> {selectedPrescription.prescription_date.split('T')[0]}</p>
              <p><strong>الحالة:</strong> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPrescription.status === 'صُرفت' ? 'bg-green-200 text-green-800' :
                selectedPrescription.status === 'مرفوضة' ? 'bg-red-200 text-red-800' :
                  'bg-green-200 text-green-800'
                }`}>صُرفت</span></p>
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
                  {
                    selectedPrescription.medicines.map((med, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-right">{med.name}</td>
                        <td className="py-2 px-4 text-right">{med.strength}</td>
                        <td className="py-2 px-4 text-right">{med.stock_quantity
                        }</td>
                        <td className="py-2 px-4 text-right">
                          <span>{med.pivot.duration}</span>{`, `}
                          <span>{med.pivot.frequency}</span>{`, `}
                          <span>{med.pivot.instructions}</span>
                        </td>
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
