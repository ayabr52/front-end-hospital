// src/doctor-sections/MedicalTests/DoctorMedicalTests.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader, Info } from 'lucide-react';
import {
    getMedicalRecords,
    addMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
    getPatients,
    getDoctors
} from '../../services/api-service';

const DoctorMedicalTests = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [currentDoctorId, setCurrentDoctorId] = useState(1); // placeholder for authenticated doctor ID
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        record_date: '',
        diagnosis: '',
        treatment: '',
        medication: '',
        instructions: '',
        dosage: '',
        notes: ''
    });
    const [message, setMessage] = useState('');

    // جلب السجلات الطبية والمرضى والأطباء من الـ API عند تحميل المكون
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [fetchedRecords, fetchedPatients, fetchedDoctors] = await Promise.all([
                    getMedicalRecords(),
                    getPatients(),
                    getDoctors()
                ]);

                setMedicalRecords(fetchedRecords);
                setPatients(fetchedPatients);
                setDoctors(fetchedDoctors);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('حدث خطأ أثناء جلب البيانات. يرجى التحقق من اتصالك بالإنترنت أو إعدادات الـ API.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddRecord = () => {
        setSelectedRecord(null);
        setFormData({
            patient_id: '',
            doctor_id: currentDoctorId,
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

    const handleEditRecord = (record) => {
        setSelectedRecord(record);
        setFormData({
            patient_id: record.patient_id,
            doctor_id: record.doctor_id,
            record_date: record.record_date,
            diagnosis: record.diagnosis,
            treatment: record.treatment,
            medication: formData.medication,
            instructions: formData.instructions,
            dosage: formData.dosage,
            notes: record.notes
        });
        setShowForm(true);
    };

    // فتح نافذة تأكيد الحذف
    const handleDeleteRecord = (record) => {
        setRecordToDelete(record);
        setShowDeleteConfirm(true);
    };

    // تأكيد عملية الحذف
    const confirmDelete = async () => {
        if (!recordToDelete) return;
        try {
            setMessage('');
            await deleteMedicalRecord(recordToDelete.id);
            setMedicalRecords(medicalRecords.filter(rec => rec.id !== recordToDelete.id));
            setMessage('تم حذف السجل الطبي بنجاح.');
        } catch (err) {
            console.error('Failed to delete medical record:', err);
            setMessage('حدث خطأ أثناء حذف السجل الطبي.');
        } finally {
            setShowDeleteConfirm(false);
            setRecordToDelete(null);
        }
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
                setMedicalRecords(medicalRecords.map(rec =>
                    rec.id === selectedRecord.id ? result : rec
                ));
                setMessage('تم تحديث السجل الطبي بنجاح.');
            } else {
                result = await addMedicalRecord(dataToSend); // 👈 تم التعديل لإرسال البيانات الجديدة
                setMedicalRecords([...medicalRecords, result]);
                setMessage('تم إضافة سجل طبي جديد بنجاح.');
            }
            setShowForm(false);
        } catch (err) {
            console.error('Failed to save medical record:', err);
            setMessage('حدث خطأ أثناء حفظ السجل الطبي.');
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setSelectedRecord(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md">
                <Loader className="animate-spin text-blue-500 ml-2" size={24} />
                <span className="text-gray-600">جارٍ تحميل السجلات الطبية...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                <Info className="flex-shrink-0 inline w-4 h-4 ml-3" />
                <div>{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-right">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة السجلات الطبية</h3>

            {message && (
                <div className="flex items-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                    <Info className="flex-shrink-0 inline w-4 h-4 ml-3" />
                    <div>{message}</div>
                </div>
            )}

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

            <h4 className="text-xl font-semibold text-gray-700 mb-4 mt-8">السجلات الطبية المسجلة</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-right">اسم المريض</th>
                            <th className="py-3 px-6 text-right">التاريخ</th>
                            <th className="py-3 px-6 text-right">التشخيص</th>
                            <th className="py-3 px-6 text-right"> العلاج</th>
                            <th className="py-3 px-6 text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {medicalRecords.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">لا توجد سجلات طبية مسجلة حالياً.</td>
                            </tr>
                        ) : (
                            medicalRecords.map((record) => (
                                <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-right whitespace-nowrap">
                                        {record.patient?.user?.name || 'غير معروف'}
                                    </td>
                                    <td className="py-3 px-6 text-right">{record.record_date}</td>
                                    <td className="py-3 px-6 text-right">{record.diagnosis}</td>
                                    <td className="py-3 px-6 text-right">{record.treatment}</td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <div className="flex item-center justify-center gap-4">
                                            <button
                                                onClick={() => handleEditRecord(record)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                                                title="تعديل السجل"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRecord(record)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                                                title="حذف السجل"
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

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-right">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">تأكيد الحذف</h4>
                        <p className="mb-6">هل أنت متأكد أنك تريد حذف السجل الطبي للمريض {recordToDelete?.patient?.user?.name || 'غير معروف'}؟</p>
                        <div className="flex justify-end space-x-4 space-x-reverse">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                            >
                                نعم، احذف
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorMedicalTests;