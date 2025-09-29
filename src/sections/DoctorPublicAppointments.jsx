import React, { useState } from 'react';
import { CalendarPlus, LoaderCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import { addAppointment } from '../services/api-service';

// A custom Modal component to replace alert() and confirm()
const Modal = ({ show, title, message, type, onClose }) => {
    if (!show) return null;

    let modalClasses = "bg-white rounded-lg p-6 max-w-sm w-full shadow-lg";
    let icon = null;
    let iconColor = "text-gray-500";

    switch (type) {
        case 'success':
            icon = <CheckCircle size={32} />;
            iconColor = "text-green-500";
            break;
        case 'error':
            icon = <XCircle size={32} />;
            iconColor = "text-red-500";
            break;
        case 'info':
        default:
            icon = <Info size={32} />;
            iconColor = "text-gray-500";
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className={modalClasses}>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XCircle size={24} />
                    </button>
                </div>
                <div className="py-4 flex flex-col items-center text-center">
                    <div className={`mb-4 ${iconColor}`}>{icon}</div>
                    <p className="text-sm text-gray-700">{message}</p>
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                    >
                        موافق
                    </button>
                </div>
            </div>
        </div>
    );
};

const DoctorPublicAppointments = ({ doctor, onBack }) => {
    // بيانات مواعيد وهمية لهذا الطبيب
    const [availableAppointments, setAvailableAppointments] = useState([
        { id: 1, date: '2025-08-01', time: '09:00 صباحاً', status: 'متاح' },
        { id: 2, date: '2025-08-01', time: '11:00 صباحاً', status: 'متاح' },
        { id: 3, date: '2025-08-02', time: '14:00 مساءً', status: 'متاح' },
        { id: 4, date: '2025-08-03', time: '10:00 صباحاً', status: 'متاح' },
    ]);

    const [newAppointmentDate, setNewAppointmentDate] = useState('');
    const [newAppointmentTime, setNewAppointmentTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info' });
    
    // A placeholder for the current patient's user ID. This should be dynamic in a real app.
    const currentPatientId = 1;

    const handleShowModal = (title, message, type) => {
        setModalContent({ title, message, type });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleBookAppointment = async (e) => {
        e.preventDefault();
        
        if (!newAppointmentDate || !newAppointmentTime) {
            handleShowModal('بيانات غير مكتملة', 'يرجى اختيار التاريخ والوقت لحجز الموعد.', 'error');
            return;
        }

        setLoading(true);

        try {
            const combinedDateTime = `${newAppointmentDate} ${newAppointmentTime}:00`;
            const appointmentData = {
                patient_id: currentPatientId,
                doctor_id: doctor.id, // استخدام معرف الطبيب الفعلي
                appointment_date: combinedDateTime,
                description: "طلب حجز موعد عبر الملف العام للطبيب.", // يمكن تغيير هذا الوصف
            };

            await addAppointment(appointmentData);

            setNewAppointmentDate('');
            setNewAppointmentTime('');

            handleShowModal('تم بنجاح', 'تم إرسال طلب حجز الموعد بنجاح. سيتم مراجعته من قبل الطبيب.', 'success');
        } catch (err) {
            console.error('Failed to book appointment:', err);
            const errorMessage = err.response?.data?.message || 'فشل في إرسال طلب حجز الموعد. يرجى المحاولة مرة أخرى.';
            handleShowModal('خطأ في الحجز', errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-right">
            <button
                onClick={onBack}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200 mb-6 flex items-center"
            >
                العودة لقائمة الأطباء
            </button>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                مواعيد الدكتور: {doctor.name} ({doctor.specialty})
            </h3>
            <p className="text-gray-600 mb-6">{doctor.bio}</p>

            <h4 className="text-xl font-semibold text-gray-700 mb-4">المواعيد المتاحة</h4>
            <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-right">التاريخ</th>
                            <th className="py-3 px-6 text-right">الوقت</th>
                            <th className="py-3 px-6 text-right">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {availableAppointments.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-4 px-6 text-center text-gray-500">لا توجد مواعيد متاحة حالياً.</td>
                            </tr>
                        ) : (
                            availableAppointments.map((appt) => (
                                <tr key={appt.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-right">{appt.date}</td>
                                    <td className="py-3 px-6 text-right">{appt.time}</td>
                                    <td className="py-3 px-6 text-right">
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800">
                                            {appt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            <h4 className="text-xl font-semibold text-gray-700 mb-4">طلب حجز موعد جديد</h4>
            <form onSubmit={handleBookAppointment} className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div>
                    <label htmlFor="appt-date" className="block text-gray-700 text-sm font-bold mb-2">التاريخ المطلوب</label>
                    <input
                        type="date"
                        id="appt-date"
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                        value={newAppointmentDate}
                        onChange={(e) => setNewAppointmentDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="appt-time" className="block text-gray-700 text-sm font-bold mb-2">الوقت المطلوب</label>
                    <input
                        type="time"
                        id="appt-time"
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                        value={newAppointmentTime}
                        onChange={(e) => setNewAppointmentTime(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <LoaderCircle size={20} className="ml-2 animate-spin" />
                            <span>جارٍ الإرسال...</span>
                        </>
                    ) : (
                        <>
                            <CalendarPlus size={20} className="ml-2" />
                            <span>إرسال طلب الحجز</span>
                        </>
                    )}
                </button>
            </form>

            <Modal 
                show={showModal} 
                title={modalContent.title} 
                message={modalContent.message} 
                type={modalContent.type} 
                onClose={handleCloseModal} 
            />
        </div>
    );
};

export default DoctorPublicAppointments;
