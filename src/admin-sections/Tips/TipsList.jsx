// src/admin-sections/Rooms/RoomsList.jsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const TipsList = ({ tips, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">عنوان النصيحة</th>
            <th className="py-3 px-6 text-right">الوصف</th>
            <th className="py-3 px-6 text-right">النصائح</th>
            <th className="py-3 px-6 text-center">الأجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {tips.map((tip) => {            
            return  <tr key={tip.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-right">{tip.title}</td> 
              <td className="py-3 px-6 text-right">{tip.description}</td>
              <td className="py-3 px-6 text-right">
                {
                  tip?.items.map((e)=>{
                    return <p key={e.id}>
                      {e.content}
                    </p>
                  })
                }  
              </td> 
              <td className="py-3 px-6 text-center whitespace-nowrap">
                <div className="flex item-center justify-center gap-4">
                  <button
                    onClick={() => onEdit(tip)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                    title="تعديل"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(tip.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    title="حذف"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TipsList;
