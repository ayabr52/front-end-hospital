// src/admin-sections/Tips/AdminTips.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import TipsList from './TipsList.jsx';
import TipsForm from './TipsForm.jsx';
import { getTips, addTip, updateTip, deleteTip } from '../../services/TipService'; // استيراد خدمات النصائح

const AdminTips = () => {
  const [tips, setTips] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedTip, setSelectedTip] = useState(null);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الأخطاء

  // دالة لجلب النصائح من الـ API
  const fetchTips = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTips();
      setTips(data);
    } catch (err) {
      setError('فشل في جلب النصائح: ' + (err.response?.data?.message || err.message));
      console.error('Failed to fetch Tips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips(); 
  }, []);

  const handleAddTips = () => {
    setSelectedTip(null);
    setViewMode('add');
  };

  const handleEditTips = (tip) => {
    setSelectedTip(tip);
    setViewMode('edit');
  };

  const handleDeleteTips = async (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه النصيحة؟')) {
      try {
        await deleteTip(id);
        alert('تم حذف النصيحة بنجاح.');
        fetchTips(); // إعادة جلب النصائح بعد الحذف
      } catch (err) {
        alert('فشل في حذف النصيحة: ' + (err.response?.data?.message || err.message));
        console.error('Failed to delete Tip:', err);
      }
    }
  };

  const handleSaveTip = async (tipData) => {
    setError(null);    
        
    try {
      if (tipData.id && tips.some(r => r.id === tipData.id)) {
        // تعديل نصيحة موجودة
        await updateTip(tipData.id, {
          title: tipData.title,
          description:tipData.description,
          items:tipData.items.map((e)=>e),
        });
        alert('تم تحديث النصيحة بنجاح.');
      } else {
        // إضافة غرفة جديدة
        await addTip({
          title: tipData.title,
          description:tipData.description,
          items:tipData.items,
        });
        alert('تم إضافة النصيحة بنجاح.');
      }
      setViewMode('list'); // العودة إلى عرض القائمة
      fetchTips(); // إعادة جلب النصائح بعد الحفظ
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      const validationErrors = err.response?.data?.errors;
      let fullErrorMessage = errorMessage;
      if (validationErrors) {
        fullErrorMessage += '\n' + Object.values(validationErrors).map(e => e.join(', ')).join('\n');
      }
      alert('فشل في حفظ النصيحة: ' + fullErrorMessage);
      console.error('Failed to save tip:', err);
    }
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedTip(null);
    setError(null); // مسح الأخطاء عند الإلغاء
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-600 text-lg">جاري تحميل النصائح...</p>
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
        <h3 className="text-2xl font-semibold text-gray-800">إدارة النصائح الداخلية</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddTips}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إضافة نصيحة
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <TipsList
          tips={tips}
          onEdit={handleEditTips}
          onDelete={handleDeleteTips}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <TipsForm
          tipToEdit={selectedTip}
          onSave={handleSaveTip}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminTips;
