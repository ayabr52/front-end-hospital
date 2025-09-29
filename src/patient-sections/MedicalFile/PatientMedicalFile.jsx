// src/patient-sections/MedicalFile/PatientMedicalFile.jsx
import React, { useState, useEffect } from 'react';
import { FileText, HeartPulse, Thermometer, Stethoscope, Loader, Info } from 'lucide-react';
import { 
    getMedicalRecords
} from '../../services/api-service';

const PatientMedicalFile = () => {
    const [medicalData, setMedicalData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // دالة getMedicalRecords تُرجع المصفوفة مباشرةً
                const response = await getMedicalRecords();
                
                console.log('API Response:', response);

                // تم التغيير هنا: التحقق مباشرةً من المصفوفة response وطولها
                if (response && response.length > 0) {
                    const extractedData = {
                        // تم التغيير هنا: الوصول إلى أول عنصر في المصفوفة
                        patientData: response[0].patient,
                        // تم التغيير هنا: تخزين المصفوفة كاملةً
                        medicalRecords: response
                    };
                    setMedicalData(extractedData);
                    console.log('Medical Data set in state:', extractedData);
                } else {
                    setMedicalData({
                        patientData: null,
                        medicalRecords: []
                    });
                }
            } catch (err) {
                console.error('Failed to fetch medical data:', err); 
                setError('حدث خطأ أثناء جلب البيانات الطبية. يرجى المحاولة مرة أخرى.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md">
                <Loader className="animate-spin text-blue-500 ml-2" size={24} />
                <span className="text-gray-600">جارٍ تحميل الملف الطبي...</span>
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
    
    if (!medicalData || !medicalData.patientData) {
        return (
            <div className="flex items-center p-4 mb-4 text-sm text-gray-700 bg-gray-100 rounded-lg" role="alert">
                <Info className="flex-shrink-0 inline w-4 h-4 ml-3" />
                <div>لا توجد بيانات متاحة لهذا المريض.</div>
            </div>
        );
    }

    const { patientData, medicalRecords } = medicalData;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-right">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">ملفي الطبي</h3>

            <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-blue-50">
                <h4 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <FileText size={24} className="ml-2" />
                    معلومات المريض الأساسية
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <p><strong>الاسم الكامل:</strong> {patientData.user?.name || 'غير متوفر'}</p>
                    <p><strong>الرقم الوطني:</strong> {patientData.user?.national_id || 'غير متوفر'}</p>
                    <p><strong>تاريخ الميلاد:</strong> {patientData.user?.dob ? new Date(patientData.user.dob).toLocaleDateString('ar-SA', { calendar: 'gregory' }) : 'غير متوفر'}
</p>
                    <p><strong>الجنس:</strong> {patientData.user?.gender || 'غير متوفر'}</p>
                    <p><strong>فصيلة الدم:</strong> {patientData.blood_group || 'غير متوفر'}</p>
                    <p><strong>العنوان:</strong> {patientData.user?.address || 'غير متوفر'}</p>
                    <p><strong>الحساسيات:</strong> {patientData.allergies?.join(', ') || 'لا توجد'}</p>
                    <p><strong>الأمراض المزمنة:</strong> {patientData.chronic_diseases?.join(', ') || 'لا توجد'}</p>
                    <p><strong>العمليات السابقة:</strong> {patientData.past_surgeries?.join(', ') || 'لا توجد'}</p>
                </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <Stethoscope size={24} className="ml-2" />
                الاختبارات والفحوصات
            </h4>
            {medicalRecords.length === 0 ? (
                <p className="text-gray-500 text-center py-4">لا توجد سجلات طبية مسجلة حالياً.</p>
            ) : (
                <div className="space-y-6">
                    {medicalRecords.map(record => (
                        <div key={record.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold text-gray-800">تاريخ: {new Date(record.record_date).toLocaleDateString('ar-SA', { calendar: 'gregory' })}</p>
                                <p className="text-sm text-gray-600">الطبيب: {record.doctor?.user?.name || 'غير معروف'}</p>
                            </div>
                            <p className="text-gray-700 mb-2"><strong>التشخيص:</strong> {record.diagnosis}</p>
                            <p className="text-gray-700 mb-2"><strong>العلاج:</strong> {record.treatment || 'لا توجد'}</p>
                            <p className="text-gray-700"><strong>ملاحظات:</strong> {record.notes || 'لا توجد'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientMedicalFile;