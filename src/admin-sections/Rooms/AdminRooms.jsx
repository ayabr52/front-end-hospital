// src/admin-sections/Rooms/AdminRooms.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import RoomsList from './RoomsList';
import RoomForm from './RoomForm';
import { getRooms, addRoom, updateRoom, deleteRoom } from '../../services/RoomService'; // استيراد خدمات الغرف

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الأخطاء

  // دالة لجلب الغرف من الـ API
  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      setError('فشل في جلب الغرف: ' + (err.response?.data?.message || err.message));
      console.error('Failed to fetch rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(); // جلب الغرف عند تحميل المكون
  }, []);

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setViewMode('add');
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setViewMode('edit');
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الغرفة؟')) {
      try {
        await deleteRoom(id);
        alert('تم حذف الغرفة بنجاح.');
        fetchRooms(); // إعادة جلب الغرف بعد الحذف
      } catch (err) {
        alert('فشل في حذف الغرفة: ' + (err.response?.data?.message || err.message));
        console.error('Failed to delete room:', err);
      }
    }
  };

  const handleSaveRoom = async (roomData) => {
    setError(null);
    try {
      if (roomData.id && rooms.some(r => r.id === roomData.id)) {
        // تعديل غرفة موجودة
        await updateRoom(roomData.id, {
          room_number: roomData.room_number,
          type: roomData.type,
          capacity: parseInt(roomData.capacity), // تأكد من تحويلها إلى رقم
          status: roomData.status,
          notes: roomData.notes,
          department_id: roomData.department_id // يجب أن يكون معرف القسم
        });
        alert('تم تحديث الغرفة بنجاح.');
      } else {
        // إضافة غرفة جديدة
        await addRoom({
          room_number: roomData.room_number,
          type: roomData.type,
          capacity: parseInt(roomData.capacity), // تأكد من تحويلها إلى رقم
          status: roomData.status,
          notes: roomData.notes,
          department_id: roomData.department_id // يجب أن يكون معرف القسم
        });
        alert('تم إضافة الغرفة بنجاح.');
      }
      setViewMode('list'); // العودة إلى عرض القائمة
      fetchRooms(); // إعادة جلب الغرف بعد الحفظ
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      const validationErrors = err.response?.data?.errors;
      let fullErrorMessage = errorMessage;
      if (validationErrors) {
        fullErrorMessage += '\n' + Object.values(validationErrors).map(e => e.join(', ')).join('\n');
      }
      alert('فشل في حفظ الغرفة: ' + fullErrorMessage);
      console.error('Failed to save room:', err);
    }
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedRoom(null);
    setError(null); // مسح الأخطاء عند الإلغاء
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-600 text-lg">جاري تحميل الغرف...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">خطأ!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">إدارة الغرف الداخلية</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddRoom}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إضافة غرفة
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <RoomsList
          rooms={rooms}
          onEdit={handleEditRoom}
          onDelete={handleDeleteRoom}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <RoomForm
          roomToEdit={selectedRoom}
          onSave={handleSaveRoom}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminRooms;
