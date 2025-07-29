// src/accountant-sections/Invoices/AccountantInvoices.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import InvoicesList from './InvoicesList';
import InvoiceForm from './InvoiceForm';

const initialInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV001',
    patientName: 'علياء محمود',
    serviceDate: '2025-07-20',
    services: [
      { description: 'فحص طبي عام', quantity: 1, unitPrice: 50 },
      { description: 'تحليل دم', quantity: 1, unitPrice: 30 },
    ],
    discounts: 5,
    insurance: 0,
    total: 75,
    paymentStatus: 'مدفوعة',
    paymentMethod: 'نقدي',
    notes: 'تم الدفع بالكامل.',
  },
  {
    id: 2,
    invoiceNumber: 'INV002',
    patientName: 'سامي خالد',
    serviceDate: '2025-07-18',
    services: [
      { description: 'عملية جراحية بسيطة', quantity: 1, unitPrice: 500 },
      { description: 'أدوية بعد العملية', quantity: 1, unitPrice: 75 },
    ],
    discounts: 0,
    insurance: 100,
    total: 475,
    paymentStatus: 'معلقة',
    paymentMethod: 'بنكي',
    notes: 'بانتظار تحويل التأمين.',
  },
];

const AccountantInvoices = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit', 'view'
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleAddInvoice = () => {
    setSelectedInvoice(null);
    setViewMode('add');
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setViewMode('edit');
  };

  const handleDeleteInvoice = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الفاتورة؟')) {
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setViewMode('view');
  };

  const handleSaveInvoice = (invoiceData) => {
    if (invoiceData.id && invoices.some(inv => inv.id === invoiceData.id)) {
      // تعديل فاتورة موجودة
      setInvoices(invoices.map(invoice =>
        invoice.id === invoiceData.id ? invoiceData : invoice
      ));
    } else {
      // إضافة فاتورة جديدة
      setInvoices([...invoices, { ...invoiceData, id: Date.now() }]);
    }
    setViewMode('list');
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setSelectedInvoice(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">إدارة الفواتير</h3>
        {viewMode === 'list' && (
          <button
            onClick={handleAddInvoice}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} className="ml-2" />
            إنشاء فاتورة جديدة
          </button>
        )}
      </div>

      {viewMode === 'list' && (
        <InvoicesList
          invoices={invoices}
          onEdit={handleEditInvoice}
          onDelete={handleDeleteInvoice}
          onView={handleViewInvoice}
        />
      )}
      {(viewMode === 'add' || viewMode === 'edit') && (
        <InvoiceForm
          invoiceToEdit={selectedInvoice}
          onSave={handleSaveInvoice}
          onCancel={handleCancelForm}
        />
      )}

      {viewMode === 'view' && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-right relative">
            <h4 className="text-2xl font-semibold text-gray-800 mb-6">تفاصيل الفاتورة: {selectedInvoice.invoiceNumber}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <p><strong>اسم المريض:</strong> {selectedInvoice.patientName}</p>
              <p><strong>تاريخ الخدمة:</strong> {selectedInvoice.serviceDate}</p>
              <p><strong>حالة الدفع:</strong> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedInvoice.paymentStatus === 'مدفوعة' ? 'bg-green-200 text-green-800' :
                  selectedInvoice.paymentStatus === 'معلقة' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>{selectedInvoice.paymentStatus}</span></p>
              <p><strong>طريقة الدفع:</strong> {selectedInvoice.paymentMethod || 'غير محدد'}</p>
            </div>

            <h5 className="text-lg font-semibold text-gray-700 mb-3">الخدمات المقدمة:</h5>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                    <th className="py-2 px-4 text-right">الوصف</th>
                    <th className="py-2 px-4 text-right">الكمية</th>
                    <th className="py-2 px-4 text-right">سعر الوحدة</th>
                    <th className="py-2 px-4 text-right">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {selectedInvoice.services.map((service, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 px-4 text-right">{service.description}</td>
                      <td className="py-2 px-4 text-right">{service.quantity}</td>
                      <td className="py-2 px-4 text-right">{service.unitPrice.toFixed(2)} $</td>
                      <td className="py-2 px-4 text-right">{(service.quantity * service.unitPrice).toFixed(2)} $</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-left space-y-2 mb-6">
              <p><strong>الخصومات:</strong> {selectedInvoice.discounts.toFixed(2)} $</p>
              <p><strong>التأمين:</strong> {selectedInvoice.insurance.toFixed(2)} $</p>
              <p className="text-xl font-bold text-blue-800">الإجمالي الكلي: {selectedInvoice.total.toFixed(2)} $</p>
            </div>

            <p className="mb-6"><strong>ملاحظات:</strong> {selectedInvoice.notes || 'لا توجد ملاحظات.'}</p>

            <div className="flex justify-end">
              <button
                onClick={handleCancelForm}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountantInvoices;
