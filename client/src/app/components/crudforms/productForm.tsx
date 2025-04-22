import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";

interface ProductFormProps {
  mode: "add" | "edit";
  initialData?: {
    ProductID?: number;
    Name: string;
    Description: string;
    Category: string;
    Price: number;
  };
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, initialData, onClose }) => {
  const { addItem, modifyItem } = useData();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setName(initialData.Name);
      setDescription(initialData.Description);
      setCategory(initialData.Category);
      setPrice(initialData.Price);
    }
  }, [mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { Name: name, Description: description, Category: category, Price: price };

    if (mode === "add") {
      await addItem("products", payload);
    } else if (mode === "edit" && initialData?.ProductID) {
      await modifyItem("products", String(initialData.ProductID), payload);
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold text-gray-800">
        {mode === "add" ? "Add New Product" : "Edit Product"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          step="0.01"
          min="0"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {mode === "add" ? "Add Product" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
