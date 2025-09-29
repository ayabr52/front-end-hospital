import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import InventoryList from "./InventoryList";
import InventoryForm from "./InventoryForm";
import {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../../services/InventoryService";

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // list | add | edit
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (err) {
      setError("فشل في جلب بيانات المستودع: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddItem = () => {
    setSelectedItem(null);
    setViewMode("add");
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setViewMode("edit");
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا الصنف؟")) {
      try {
        await deleteInventoryItem(id);
        alert("تم حذف الصنف بنجاح.");
        fetchInventory();
      } catch (err) {
        alert("فشل في حذف الصنف: " + err.message);
      }
    }
  };

  const handleSaveItem = async (itemData) => {
    try {
      if (itemData.id && inventory.some((i) => i.id === itemData.id)) {
        await updateInventoryItem(itemData.id, itemData);
        alert("تم تحديث الصنف بنجاح.");
      } else {
        await addInventoryItem(itemData);
        alert("تم إضافة الصنف بنجاح.");
      }
      setViewMode("list");
      fetchInventory();
    } catch (err) {
      alert("فشل في حفظ الصنف: " + err.message);
    }
  };

  const handleCancelForm = () => {
    setViewMode("list");
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-600 text-lg">جاري تحميل بيانات المستودع...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">خطأ:</strong> {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-800">إدارة المستودع</h2>
        {viewMode === "list" && (
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-600 transition-colors duration-200"
          >
            <PlusCircle size={20} className="ml-2" />
            إضافة صنف
          </button>
        )}
      </div>

      {viewMode === "list" && (
        <InventoryList
          items={inventory}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      )}
      {(viewMode === "add" || viewMode === "edit") && (
        <InventoryForm
          itemToEdit={selectedItem}
          onSave={handleSaveItem}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default AdminInventory;
