// src/admin-sections/Departments/DepartmentForm.jsx
import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const TipsForm = ({ tipToEdit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        items: [],
    });
    useEffect(() => {
        if (tipToEdit) {
            
            setFormData({
                title: tipToEdit.title,
                description: tipToEdit.description,
                items: tipToEdit.items.map((e)=>typeof e ==='string'?e:e.content),
                id: tipToEdit.id, // احتفظ بالمعرف للتعديل
            });
        } else {
            // مسح النموذج عند إضافة جديد
            setFormData({
                title: "",
                description: "",
                items: [],
            });
        }
    }, [tipToEdit]);

    const handleCreateRow = () => {
        if (formData.items[formData.items.length - 1]!== "" ) {          
            setFormData({
                ...formData,
                items: [
                    ...formData.items,
                    '',
                ],
            });
        } else {
            alert("Please Fill All Fields Before Create A new Tip");
        }
    };
    const handleDeleteRow=(e)=>{
        setFormData({
            ...formData,
            items:formData.items.filter((item)=>item!==e)
        })
    }
    const handleChangeItems = (index, e) => {
        const {  value } = e.target;
        setFormData({
            ...formData,
            items: formData.items.map((item, i) =>
                i === index ? value : item
            ),
        });
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-right">
                {tipToEdit ? "تعديل نصيحة" : "إضافة نصيحة جديدة"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        العنوان
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="title" // إضافة اسم للحقل
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        الوصف
                    </label>
                    <textarea
                        id="description"
                        name="description" // إضافة اسم للحقل
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right h-24 resize-none"
                        required
                    ></textarea>
                </div>
                <div>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-right">محتوى النصيحة</th>
                                <th className="py-3 px-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.items.map((item,i) => {
                                return (
                                    <tr key={i}>
                                        <td className="px-4 py-4">
                                            <input
                                                type="text"
                                                name={`${i}`}
                                                value={typeof item ==='string'?item:item.content}
                                                onChange={(e) => handleChangeItems(i, e)}
                                                className="shadow appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteRow(item)}
                                                className="text-red-600 hover:text-red-800 transition-colors duration-150 p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                                title="حذف"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button 
                    onClick={handleCreateRow}
                    type="button"
                    className="bg-blue-600 text-white px-6 py-2 my-4 rounded-full hover:bg-blue-700 transition-colors duration-200">
                        اضافة نصيحة جديدة
                    </button>
                </div>
                <div className="flex justify-end space-x-4 space-x-reverse">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                    >
                        {tipToEdit ? "حفظ التعديلات" : "إضافة"}
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

export default TipsForm;
