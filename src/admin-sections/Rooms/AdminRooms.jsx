// src/admin-sections/Rooms/AdminRooms.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import RoomsList from './RoomsList';
import RoomForm from './RoomForm';

const initialRooms = [
  { id: 1, code: 'NT2', department_id: 'النسائية والتوليد', specialty_id: 'نسائية', floor_number: 2, bed_capacity: 5 },
  { id: 2, code: 'ICU1', department_id: 'العناية المركزة', specialty_id: 'عام', floor_number: 1, bed_capacity: 2 },
  { id: 3, code: 'PED3', department_id: 'الأطفال', specialty_id: 'أطفال', floor_number: 3, bed_capacity: 4 },
];

const AdminRooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setViewMode('add');
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setViewMode('edit');
  };

  const handleDeleteRoom = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الغرفة؟')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const handleSaveRoom = (roomData) => {
    if (roomData.id && rooms.some(r => r.id === roomData.id)) {
      // تعديل غرفة موجودة
      setRooms(rooms.map(room =>
        room.id === roomData.id ? roomData : room
      ));
    } else {
      // إضافة غرفة جديدة
      setRooms([...rooms, { ...roomData, id: Date.now() }]);
    }
    setViewMode('list');
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedRoom(null);
  };

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
