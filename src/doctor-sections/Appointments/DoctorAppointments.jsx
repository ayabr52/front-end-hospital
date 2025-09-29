import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, Loader, Info } from 'lucide-react';
import { getAppointments, updateAppointment } from '../../services/api-service';

// ترجمة الحالات
const statusTranslations = {
    'pending': 'قيد الانتظار',
    'confirmed': 'مقبول',
    'cancelled': 'مرفوض',
    'completed': 'مكتمل'
};

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showPatientDetails, setShowPatientDetails] = useState(false);
    const [message, setMessage] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [newDate, setNewDate] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setIsLoading(true);
                const fetchedAppointments = await getAppointments();
                setAppointments(fetchedAppointments);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch appointments:', err);
                setError('حدث خطأ أثناء جلب المواعيد.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    // تنسيق التاريخ للـ API: Y-m-d H:i:s
// دالة لتحويل datetime-local إلى صيغة API Y-m-d H:i:s
const formatToApiDate = (localDateTimeString) => {
    if (!localDateTimeString) return null; // إذا ما في قيمة
    const [date, time] = localDateTimeString.split("T"); // "2025-09-19T18:30"
    return `${date} ${time}:00`; // => "2025-09-19 18:30:00"
};

// تعديل حالة الموعد
const handleUpdateStatus = async (id, newStatus) => {
    try {
        setMessage('');

        const appointmentToUpdate = appointments.find(appt => appt.id === id);
        if (!appointmentToUpdate) throw new Error('Appointment not found.');

        // لو المستخدم ما غير التاريخ بالـ input، نستخدم التاريخ الأصلي
        const apiDate = newDate
            ? formatToApiDate(newDate)
            : appointmentToUpdate.appointment_date;

        const updateData = {
            doctor_id: appointmentToUpdate.doctor_id,
            appointment_date: apiDate,
            status: newStatus,
            notes: newNotes || appointmentToUpdate.notes,
                patient_id: appointmentToUpdate.patient.id, // ← ضروري للباك

        };

        const updatedAppointment = await updateAppointment(id, updateData);

        setAppointments(appointments.map(appt =>
            appt.id === id ? updatedAppointment : appt
        ));
        setMessage(`تم تحديث حالة الموعد إلى "${statusTranslations[newStatus]}" بنجاح.`);
        handleClosePatientDetails();
        setNewNotes('');
        setNewDate('');
    } catch (err) {
        console.error('Failed to update appointment status:', err);
        setMessage('حدث خطأ أثناء تحديث حالة الموعد.');
    }
};



    const handleAcceptAppointment = (id) => handleUpdateStatus(id, 'confirmed');
    const handleRejectAppointment = (id) => handleUpdateStatus(id, 'cancelled');

    const handleViewPatientDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPatientDetails(true);
        setNewNotes(appointment.notes);

        // تجهيز التاريخ لحقل datetime-local
        const dt = new Date(appointment.appointment_date);
        const localDateTime = dt.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
        setNewDate(localDateTime);
    };

    const handleClosePatientDetails = () => {
        setSelectedAppointment(null);
        setShowPatientDetails(false);
        setNewNotes('');
        setNewDate('');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md">
                <Loader className="animate-spin text-blue-500 mr-2" size={24} />
                <span className="text-gray-600">جارٍ تحميل المواعيد...</span>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-right">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة المواعيد</h3>

            {message && (
                <div className="flex items-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                    <Info className="flex-shrink-0 inline w-4 h-4 mr-3" />
                    <div>{message}</div>
                </div>
            )}

            {error && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                    <Info className="flex-shrink-0 inline w-4 h-4 mr-3" />
                    <div>{error}</div>
                </div>
            )}

            <h4 className="text-xl font-semibold text-gray-700 mb-4">المواعيد المحجوزة</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-right">اسم المريض</th>
                            <th className="py-3 px-6 text-right">التاريخ</th>
                            <th className="py-3 px-6 text-right">الوقت</th>
                            <th className="py-3 px-6 text-right">الحالة</th>
                            <th className="py-3 px-6 text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">لا توجد مواعيد حالياً.</td>
                            </tr>
                        ) : (
                            appointments.map((appt) => (
                                <tr key={appt.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-right whitespace-nowrap">{appt.patient.user.name}</td>
                                    <td className="py-3 px-6 text-right">{appt.appointment_date.split(' ')[0]}</td>
                                    <td className="py-3 px-6 text-right">{appt.appointment_date.split(' ')[1]}</td>
                                    <td className="py-3 px-6 text-right">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            appt.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                                            appt.status === 'cancelled' ? 'bg-red-200 text-red-800' :
                                            'bg-yellow-200 text-yellow-800'
                                        }`}>
                                            {statusTranslations[appt.status]}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <div className="flex item-center justify-center space-x-2 space-x-reverse">
                                            {appt.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAcceptAppointment(appt.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                                                        title="قبول الموعد"
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectAppointment(appt.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                                                        title="رفض الموعد"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleViewPatientDetails(appt)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                                                title="عرض معلومات المريض"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Patient Details Modal */}
            {showPatientDetails && selectedAppointment && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-right relative">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">
                            معلومات المريض: {selectedAppointment.patient.user.name}
                        </h4>
                        <p className="mb-2"><strong className="font-medium">التاريخ الحالي:</strong> {selectedAppointment.appointment_date}</p>
                        
                        <div className="mb-4">
                            <label htmlFor="newDate" className="block text-gray-700 font-medium mb-2">وقت الموعد الجديد</label>
                            <input
                                type="datetime-local"
                                id="newDate"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="newNotes" className="block text-gray-700 font-medium mb-2">ملاحظات جديدة (اختياري)</label>
                            <textarea
                                id="newNotes"
                                value={newNotes}
                                onChange={(e) => setNewNotes(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                                placeholder="اكتب ملاحظات إضافية هنا..."
                            ></textarea>
                        </div>
                        
<div className="flex justify-end space-x-2 space-x-reverse">
    <button
        onClick={handleClosePatientDetails}
        className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
    >
        إغلاق
    </button>
    <button
        onClick={() => handleAcceptAppointment(selectedAppointment.id)}
        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-200"
    >
        تأكيد الموعد
    </button>
    <button
        onClick={() => handleRejectAppointment(selectedAppointment.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200"
    >
        رفض الموعد
    </button>
</div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorAppointments;
