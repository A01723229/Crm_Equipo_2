"use client";

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
  const [price, setPrice] = useState<number>(0);

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

    const productData = { Name: name, Description: description, Category: category, Price: price };

    try {
      if (mode === "add") {
        await addItem("products", productData);
      } else if (mode === "edit" && initialData?.ProductID) {
        await modifyItem("products", initialData.ProductID.toString(), productData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to submit product form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Product Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Category</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Price</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {mode === "add" ? "Add Product" : "Update Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;