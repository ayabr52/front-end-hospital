import React from "react";
import { Edit, Trash2 } from "lucide-react";

const InventoryList = ({ items, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">الصنف</th>
            <th className="py-3 px-6 text-right">الكمية</th>
            <th className="py-3 px-6 text-right">ملاحظات</th>
            <th className="py-3 px-6 text-center">إجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-6 text-right">{item.item_name}</td>
              <td className="py-3 px-6 text-right">{item.quantity}</td>
              <td className="py-3 px-6 text-right">{item.notes}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center gap-4">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full text-blue-500 hover:bg-blue-100 transition-colors"
                    onClick={() => onEdit(item)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full text-red-500 hover:bg-red-100 transition-colors"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
