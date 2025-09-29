import React, { useState, useEffect } from 'react';
import { CalendarPlus, CalendarCheck, CalendarX, X, LoaderCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import { getAppointments, getDoctors, addAppointment, deleteAppointment } from '../../services/api-service';

// A custom Modal component to replace alert() and confirm()
const Modal = ({ show, title, message, type, onConfirm, onCancel, onClose }) => {
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
    case 'confirm':
      icon = <Info size={32} />;
      iconColor = "text-blue-500";
      break;
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
            <X size={24} />
          </button>
        </div>
        <div className="py-4 flex flex-col items-center text-center">
          <div className={`mb-4 ${iconColor}`}>{icon}</div>
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-200">
          {type === 'confirm' ? (
            <>
              <button
                onClick={onCancel}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200 ml-2"
              >
                إلغاء
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                تأكيد
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              موافق
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor_id: '',
    date: '',
    time: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info', onConfirm: null, onCancel: null });
  
  // A placeholder for the current patient's user ID.
  const currentPatientId = 1;

  // Fetch doctors and appointments using the service functions
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const doctorsData = await getDoctors();
        setDoctors(doctorsData || []);

        const appointmentsData = await getAppointments();
        setAppointments(appointmentsData || []);
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('فشل في جلب البيانات. يرجى المحاولة مرة أخرى.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShowModal = (title, message, type, onConfirm = null, onCancel = null) => {
    setModalContent({ title, message, type, onConfirm, onCancel });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent({ title: '', message: '', type: 'info', onConfirm: null, onCancel: null });
  };
  
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!newAppointment.doctor_id || !newAppointment.date || !newAppointment.time || !newAppointment.description) {
      handleShowModal('بيانات غير مكتملة', 'يرجى ملء جميع حقول حجز الموعد.', 'error');
      return;
    }

    setLoading(true);
    try {
      // Correct the payload to combine date and time into a single field 'appointment_date'
      // Use a more robust method to ensure the correct format Y-m-d H:i:s
      const combinedDateTime = `${newAppointment.date} ${newAppointment.time}:00`;
      const appointmentData = {
        patient_id: currentPatientId,
        doctor_id: newAppointment.doctor_id,
        appointment_date: combinedDateTime,
        description: newAppointment.description,
      };

      await addAppointment(appointmentData);
      
      setNewAppointment({ doctor_id: '', date: '', time: '', description: '' });
      setShowBookingForm(false);
      
      const updatedAppointments = await getAppointments();
      setAppointments(updatedAppointments || []);

      handleShowModal('تم بنجاح', 'تم إرسال طلب حجز الموعد بنجاح. سيتم مراجعته من قبل الطبيب.', 'success');
    } catch (err) {
      console.error('Failed to book appointment:', err);
      const errorMessage = err.response?.data?.message || 'فشل في إرسال طلب حجز الموعد. يرجى المحاولة مرة أخرى.';
      handleShowModal('خطأ في الحجز', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = (id) => {
    handleShowModal(
      'تأكيد الإلغاء',
      'هل أنت متأكد أنك تريد إلغاء هذا الموعد؟',
      'confirm',
      () => confirmCancel(id),
      () => handleCloseModal()
    );
  };

  const confirmCancel = async (id) => {
    handleCloseModal();
    setLoading(true);
    try {
      await deleteAppointment(id);
      
      const updatedAppointments = await getAppointments();
      setAppointments(updatedAppointments || []);

      handleShowModal('تم بنجاح', 'تم إلغاء الموعد بنجاح.', 'success');
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
      const errorMessage = err.response?.data?.message || 'فشل في إلغاء الموعد. يرجى المحاولة مرة أخرى.';
      handleShowModal('خطأ في الإلغاء', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'مقبول':
        return 'bg-green-200 text-green-800';
      case 'مرفوض':
        return 'bg-red-200 text-red-800';
      case 'قيد الانتظار':
      default:
        return 'bg-yellow-200 text-yellow-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة المواعيد</h3>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <LoaderCircle className="animate-spin text-blue-600" size={48} />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <p className="font-bold">خطأ</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
            >
              <CalendarPlus size={20} className="ml-2" />
              {showBookingForm ? 'إخفاء نموذج الحجز' : 'حجز موعد جديد'}
            </button>

            {showBookingForm && (
              <form onSubmit={handleBookAppointment} className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">حجز موعد</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="doctor-select" className="block text-gray-700 text-sm font-bold mb-2">اختر الطبيب</label>
                    <select
                      id="doctor-select"
                      className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8"
                      value={newAppointment.doctor_id}
                      onChange={(e) => setNewAppointment({ ...newAppointment, doctor_id: e.target.value })}
                      required
                    >
                      <option value="">-- اختر طبيباً --</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          د. {doctor.user.name} ({doctor.specialty})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="appointment-date" className="block text-gray-700 text-sm font-bold mb-2">التاريخ</label>
                    <input
                      type="date"
                      id="appointment-date"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="appointment-time" className="block text-gray-700 text-sm font-bold mb-2">الوقت</label>
                    <input
                      type="time"
                      id="appointment-time"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="appointment-description" className="block text-gray-700 text-sm font-bold mb-2">وصف الحالة</label>
                    <textarea
                      id="appointment-description"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                      rows="3"
                      value={newAppointment.description}
                      onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
                >
                  تأكيد الحجز
                </button>
              </form>
            )}
          </div>

          <h4 className="text-xl font-semibold text-gray-700 mb-4">مواعيدي القادمة</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-right">الطبيب</th>
                  <th className="py-3 px-6 text-right">التاريخ والوقت</th>
                  <th className="py-3 px-6 text-right">الحالة</th>
                  <th className="py-3 px-6 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {appointments.length > 0 ? (
                  appointments.map((appt) => (
                    <tr key={appt.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-right whitespace-nowrap">{appt.doctor.user.name}</td>
                      <td className="py-3 px-6 text-right">{appt.appointment_date}</td>
                      <td className="py-3 px-6 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClasses(appt.status)}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        {appt.status === 'قيد الانتظار' && (
                          <button
                            onClick={() => handleCancelAppointment(appt.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            title="إلغاء الموعد"
                          >
                            <CalendarX size={16} />
                          </button>
                        )}
                        {appt.status === 'مقبول' && (
                          <span className="text-green-600" title="تم قبول الموعد">
                            <CalendarCheck size={20} />
                          </span>
                        )}
                        {appt.status === 'مرفوض' && (
                          <span className="text-red-600" title="تم رفض الموعد">
                            <CalendarX size={20} />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">لا يوجد لديك مواعيد حالياً.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {/* Custom Modal */}
      <Modal 
        show={showModal} 
        title={modalContent.title} 
        message={modalContent.message} 
        type={modalContent.type}
        onConfirm={modalContent.onConfirm}
        onCancel={modalContent.onCancel}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PatientAppointments;
