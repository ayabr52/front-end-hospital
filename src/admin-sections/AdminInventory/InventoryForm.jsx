import React, { useState, useEffect } from "react";

const InventoryForm = ({ itemToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    quantity: "",
    notes: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        item_name: itemToEdit.item_name || "",
        quantity: itemToEdit.quantity || "",
        notes: itemToEdit.notes || "",
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: itemToEdit?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-gray-700">اسم الصنف</label>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700">الكمية</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700">ملاحظات</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex space-x-4 space-x-reverse">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {itemToEdit ? "تحديث" : "إضافة"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
