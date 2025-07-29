// src/accountant-sections/Invoices/InvoiceForm.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

const InvoiceForm = ({ invoiceToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    patientName: '',
    serviceDate: '',
    services: [{ description: '', quantity: 1, unitPrice: 0 }],
    discounts: 0,
    insurance: 0,
    paymentStatus: 'معلقة',
    paymentMethod: '',
    notes: '',
  });

  useEffect(() => {
    if (invoiceToEdit) {
      setFormData(invoiceToEdit);
    } else {
      setFormData({
        invoiceNumber: '',
        patientName: '',
        serviceDate: '',
        services: [{ description: '', quantity: 1, unitPrice: 0 }],
        discounts: 0,
        insurance: 0,
        paymentStatus: 'معلقة',
        paymentMethod: '',
        notes: '',
      });
    }
  }, [invoiceToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, e) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, services: newServices });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { description: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const removeService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const calculateTotal = () => {
    const subtotal = formData.services.reduce(
      (sum, service) => sum + (service.quantity * service.unitPrice),
      0
    );
    return subtotal - formData.discounts - formData.insurance;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotal();
    onSave({ ...formData, total });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-right">
        {invoiceToEdit ? 'تعديل الفاتورة' : 'إنشاء فاتورة جديدة'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="invoiceNumber" className="block text-gray-700 text-sm font-bold mb-2">رقم الفاتورة</label>
            <input type="text" id="invoiceNumber" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
          </div>
          <div>
            <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">اسم المريض</label>
            <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
          </div>
        </div>

        <div>
          <label htmlFor="serviceDate" className="block text-gray-700 text-sm font-bold mb-2">تاريخ الخدمة</label>
          <input type="date" id="serviceDate" name="serviceDate" value={formData.serviceDate} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
        </div>

        <div className="border p-4 rounded-lg bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">تفاصيل الخدمات</h4>
          {formData.services.map((service, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
              <div className="md:col-span-2">
                <label htmlFor={`service-description-${index}`} className="block text-gray-700 text-sm font-bold mb-2">الوصف</label>
                <input type="text" id={`service-description-${index}`} name="description" value={service.description} onChange={(e) => handleServiceChange(index, e)} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
              </div>
              <div>
                <label htmlFor={`service-quantity-${index}`} className="block text-gray-700 text-sm font-bold mb-2">الكمية</label>
                <input type="number" id={`service-quantity-${index}`} name="quantity" value={service.quantity} onChange={(e) => handleServiceChange(index, e)} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" min="1" required />
              </div>
              <div>
                <label htmlFor={`service-unitPrice-${index}`} className="block text-gray-700 text-sm font-bold mb-2">سعر الوحدة</label>
                <input type="number" step="0.01" id={`service-unitPrice-${index}`} name="unitPrice" value={service.unitPrice} onChange={(e) => handleServiceChange(index, e)} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" min="0" required />
              </div>
              {formData.services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center justify-center w-10 h-10 mt-auto mx-auto md:mx-0"
                  title="إزالة الخدمة"
                >
                  <MinusCircle size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-600 transition-colors duration-200"
          >
            <PlusCircle size={20} className="ml-2" />
            إضافة خدمة
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="discounts" className="block text-gray-700 text-sm font-bold mb-2">الخصومات</label>
            <input type="number" step="0.01" id="discounts" name="discounts" value={formData.discounts} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" min="0" />
          </div>
          <div>
            <label htmlFor="insurance" className="block text-gray-700 text-sm font-bold mb-2">التأمين</label>
            <input type="number" step="0.01" id="insurance" name="insurance" value={formData.insurance} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" min="0" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="paymentStatus" className="block text-gray-700 text-sm font-bold mb-2">حالة الدفع</label>
            <select id="paymentStatus" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
              <option value="معلقة">معلقة</option>
              <option value="مدفوعة">مدفوعة</option>
              <option value="ملغاة">ملغاة</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-bold mb-2">طريقة الدفع</label>
            <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8">
              <option value="">اختر طريقة الدفع</option>
              <option value="نقدي">نقدي</option>
              <option value="بنكي">بنكي</option>
              <option value="بطاقة ائتمان">بطاقة ائتمان</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">ملاحظات</label>
          <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none"></textarea>
        </div>

        <div className="text-xl font-bold text-gray-800 text-left mt-6">
          الإجمالي: {calculateTotal().toFixed(2)} $
        </div>

        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            {invoiceToEdit ? 'حفظ التعديلات' : 'إنشاء فاتورة'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition-colors duration-200"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
