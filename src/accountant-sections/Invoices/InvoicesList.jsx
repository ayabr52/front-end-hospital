// src/accountant-sections/Invoices/InvoicesList.jsx
import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

const InvoicesList = ({ invoices, onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">رقم الفاتورة</th>
            <th className="py-3 px-6 text-right">اسم المريض</th>
            <th className="py-3 px-6 text-right">تاريخ الخدمة</th>
            <th className="py-3 px-6 text-right">المجموع</th>
            <th className="py-3 px-6 text-right">حالة الدفع</th>
            <th className="py-3 px-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {invoices.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 px-6 text-center text-gray-500">لا توجد فواتير حالياً.</td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-right whitespace-nowrap">{invoice.invoiceNumber}</td>
                <td className="py-3 px-6 text-right">{invoice.patientName}</td>
                <td className="py-3 px-6 text-right">{invoice.serviceDate}</td>
                <td className="py-3 px-6 text-right">{invoice.total.toFixed(2)} $</td>
                <td className="py-3 px-6 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    invoice.paymentStatus === 'مدفوعة' ? 'bg-green-200 text-green-800' :
                    invoice.paymentStatus === 'معلقة' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {invoice.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  <div className="flex item-center justify-center gap-4">
                    <button
                      onClick={() => onView(invoice)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
                      title="عرض الفاتورة"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(invoice)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                      title="تعديل"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(invoice.id)}
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
  );
};

export default InvoicesList;
