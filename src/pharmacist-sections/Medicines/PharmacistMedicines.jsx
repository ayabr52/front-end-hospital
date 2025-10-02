// src/pharmacist-sections/Medicines/PharmacistMedicines.jsx
import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { deleteMedicine, fetchMedicines, storeMedicine, updateMedicine } from '../../services/MedicineService';
import Skeleton from 'react-loading-skeleton';

const PharmacistMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    stock_quantity: '',
    price: '',
    expiry_date: '',
    description: '',
  });

  const handleAddMedicine = async () => {
    setSelectedMedicine(null);
    setFormData({ name: '', stock_quantity: '', price: '', expiry_date: '', description: '' });
    setShowForm(true);
  };

  const handleEditMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setFormData(medicine);
    setShowForm(true);
  };

  const handleDeleteMedicine = async (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الدواء؟')) {
      setIsLoading(true);
      try {
        const res = await deleteMedicine(id);
        if (res.status === 'success') {
          setMedicines(medicines.filter(medicine => medicine.id !== id));
          alert('تم حذف الدواء بنجاح');
        } else {
          setError('حدث خطأ أثناء حذف الدواء');
        }
      } catch (error) {
        setError(error.message || 'حدث خطأ أثناء حذف الدواء');
        alert(error.message || 'حدث خطأ أثناء حذف الدواء');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveMedicine = async (e) => {
    e.preventDefault();
    if (selectedMedicine) {
      try {
        const response = await updateMedicine(selectedMedicine.id, {
          name: formData.name,
          stock_quantity: formData.stock_quantity,
          price: formData.price,
          expiry_date: formData.expiry_date,
          description: formData.description,
        });
        console.log(response);
        
        if (response.status === 'success') {
          alert('تم تحديث الدواء بنجاح');
          setMedicines(medicines.map(medicine =>
            medicine.id === selectedMedicine.id ? { ...formData, id: selectedMedicine.id } : medicine
          ));
        } else {
          setError('حدث خطأ أثناء تحديث الدواء');
        }
      } catch (error) {
        setError(error.message || 'حدث خطأ غير متوقع أثناء تحديث الدواء');
      }
    }
    else {
      try {
        const response = await storeMedicine({
          name: formData.name,
          stock_quantity: formData.stock_quantity,
          price: formData.price,
          expiry_date: formData.expiry_date,
          description: formData.description,
        });
        if (response.status === 'success') {
          alert('تمت اضافة الدواء');
          setMedicines([...medicines, { ...formData, id: Date.now() }]);
        } else {
          setError('حدث خطأ أثناء إضافة الدواء');
        }
      } catch (error) {
        setError(error.message || 'حدث خطأ غير متوقع أثناء إضافة الدواء');
      }
    }
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedMedicine(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const handleFetchMedicines = async () => {
      try {
        setError(false)
        setIsLoading(true)
        const medicinesRes = await fetchMedicines();
        setMedicines(medicinesRes.medicines);
        return;
      } catch (error) {
        // Handle error if needed
        console.error('Failed to fetch medicines:', error);
        setError(error.message)
        return;
      }
      finally {
        setIsLoading(false)
      }
    }
    handleFetchMedicines()
  }, [])
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">إدارة الأدوية</h3>

      <div className="mb-8">
        <button
          onClick={handleAddMedicine}
          className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="ml-2" />
          إضافة دواء جديد
        </button>
      </div>

      {showForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedMedicine ? 'تعديل بيانات الدواء' : 'إضافة دواء جديد'}
          </h4>
          <form onSubmit={handleSaveMedicine} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">اسم الدواء</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="stock_quantity" className="block text-gray-700 text-sm font-bold mb-2">الكمية المتوفرة</label>
              <input type="number" id="stock_quantity" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">السعر</label>
              <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="expiry_date" className="block text-gray-700 text-sm font-bold mb-2">تاريخ الانتهاء</label>
              <input type="date" id="expiry_date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">الوصف</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
            </div>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                {selectedMedicine ? 'حفظ التعديلات' : 'إضافة'}
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

      <h4 className="text-xl font-semibold text-gray-700 mb-4 mt-8">قائمة الأدوية</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">اسم الدواء</th>
              <th className="py-3 px-6 text-right">الكمية المتوفرة</th>
              <th className="py-3 px-6 text-right">السعر</th>
              <th className="py-3 px-6 text-right">تاريخ الانتهاء</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {isLoading ?
              <tr>
                <td colSpan="5" className='py-2'>
                  <Skeleton borderRadius={8} height={6} className='py-4' />
                </td>
              </tr>
              : error ?
                (
                  <tr>
                    <td colSpan="5" className="py-4 px-6 text-center text-red-500">
                      حدث خطأ أثناء تحميل قائمة الأدوية. الرجاء المحاولة مرة أخرى.
                    </td>
                  </tr>
                ) :
                medicines.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-4 px-6 text-center text-gray-500">لا توجد أدوية حالياً.</td>
                  </tr>
                ) : (
                  medicines.map((medicine) => (
                    <tr key={medicine.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-right whitespace-nowrap">{medicine.name}</td>
                      <td className="py-3 px-6 text-right">{medicine.stock_quantity}</td>
                      <td className="py-3 px-6 text-right">{medicine.price} $</td>
                      <td className="py-3 px-6 text-right">{medicine.expiry_date.split('T')[0]}</td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        <div className="flex item-center justify-center gap-4">
                          <button
                            onClick={() => handleEditMedicine(medicine)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                            title="تعديل"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteMedicine(medicine.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            title="حذف"
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
    </div>
  );
};

export default PharmacistMedicines;
