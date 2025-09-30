// src/nurse-sections/Tasks/NurseTasks.jsx
import React, { useState } from 'react';
import { CheckCircle, XCircle, Plus, Edit, Trash2 } from 'lucide-react';

const initialNurseTasks = [
  { id: 1, description: 'قياس العلامات الحيوية للمريض علياء محمود', status: 'معلقة', dueDate: '2025-07-25' },
  { id: 2, description: 'تغيير ضماد المريض سامي خالد', status: 'مكتملة', dueDate: '2025-07-24' },
  { id: 3, description: 'إعطاء دواء للمريض ليلى فادي', status: 'معلقة', dueDate: '2025-07-26' },
];

const NurseTasks = () => {
  const [tasks, setTasks] = useState(initialNurseTasks);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({ description: '', status: 'معلقة', dueDate: '' });

  const handleAddTask = () => {
    setSelectedTask(null);
    setFormData({ description: '', status: 'معلقة', dueDate: '' });
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setFormData(task);
    setShowForm(true);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه المهمة؟')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'معلقة' ? 'مكتملة' : 'معلقة' } : task
    ));
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (selectedTask) {
      setTasks(tasks.map(task =>
        task.id === selectedTask.id ? { ...formData, id: selectedTask.id } : task
      ));
    } else {
      setTasks([...tasks, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedTask(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-right">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">مهامي</h3>

      <div className="mb-8">
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="ml-2" />
          إضافة مهمة جديدة
        </button>
      </div>

      {showForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedTask ? 'تعديل المهمة' : 'إضافة مهمة جديدة'}
          </h4>
          <form onSubmit={handleSaveTask} className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">الوصف</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right h-24 resize-none" required></textarea>
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">تاريخ الاستحقاق</label>
              <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right" required />
            </div>
            <div>
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">الحالة</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right appearance-none bg-white pr-8" required>
                <option value="معلقة">معلقة</option>
                <option value="مكتملة">مكتملة</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 mt-8">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                {selectedTask ? 'حفظ التعديلات' : 'إضافة'}
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

      <h4 className="text-xl font-semibold text-gray-700 mb-4 mt-8">قائمة المهام</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-right">الوصف</th>
              <th className="py-3 px-6 text-right">تاريخ الاستحقاق</th>
              <th className="py-3 px-6 text-right">الحالة</th>
              <th className="py-3 px-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-500">لا توجد مهام حالياً.</td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-right">{task.description}</td>
                  <td className="py-3 px-6 text-right">{task.dueDate}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      task.status === 'مكتملة' ? 'bg-green-200 text-green-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <div className="flex item-center justify-center gap-4">
                      <button
                        onClick={() => handleToggleStatus(task.id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          task.status === 'معلقة' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                        } text-white transition-colors duration-200`}
                        title={task.status === 'معلقة' ? 'وضع علامة كمكتملة' : 'وضع علامة كمعلقة'}
                      >
                        {task.status === 'معلقة' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      </button>
                      <button
                        onClick={() => handleEditTask(task)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                        title="تعديل المهمة"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                        title="حذف المهمة"
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

export default NurseTasks;
