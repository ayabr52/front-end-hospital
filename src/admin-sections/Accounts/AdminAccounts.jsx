// src/admin-sections/Accounts/AdminAccounts.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import UserAccountsList from './UserAccountsList';
import UserAccountForm from './UserAccountForm';

const initialUsers = [
  { id: 'admin1', name: 'مدير النظام', email: 'admin@example.com', role: 'admin' },
  { id: 'doctor1', name: 'د. أحمد', email: 'doctor@example.com', role: 'doctor' },
  { id: 'patient1', name: 'مريض تجريبي', email: 'patient@example.com', role: 'patient' },
  { id: 'nurse1', name: 'ممرضة سارة', email: 'nurse@example.com', role: 'nurse' },
  { id: 'reception1', name: 'موظف استقبال', email: 'reception@example.com', role: 'receptionist' },
  { id: 'accountant1', name: 'محاسب خالد', email: 'accountant@example.com', role: 'accountant' },
  { id: 'pharmacist1', name: 'صيدلي علي', email: 'pharmacist@example.com', role: 'pharmacist' },
];

const AdminAccounts = () => {
  const [users, setUsers] = useState(initialUsers);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setViewMode('add');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setViewMode('edit');
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSaveUser = (userData) => {
    if (userData.id && users.some(u => u.id === userData.id)) {
      // تعديل مستخدم موجود
      setUsers(users.map(user =>
        user.id === userData.id ? userData : user
      ));
    } else {
      // إضافة مستخدم جديد
      setUsers([...users, { ...userData, id: Date.now() }]);
    }
    setViewMode('list');
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedUser(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">إدارة رموز التوثيق</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إضافة مستخدم
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <UserAccountsList
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <UserAccountForm
          userToEdit={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminAccounts;
