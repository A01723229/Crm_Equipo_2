"use client";
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useUser } from '../context/UserContext';
import LogInBox from '../components/loginBox';
import ProductForm from '../components/crudforms/productForm';

const ProductsPage = () => {
  const { data, loading: dataLoading, error, deleteItem } = useData();
  const { user, loading: userLoading } = useUser();

  const isUser = user?.isLogin;

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  if (userLoading || dataLoading) {
    console.log('Loading products or user info...');
  }

  if (error || !data || !data.products) {
    console.log('Failed to load products.');
  }

  if (!isUser) {
    return <LogInBox />;
  }

  const handleAdd = () => {
    setFormMode("add");
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleModify = () => {
    if (selectedProduct) {
      setFormMode("edit");
      setShowForm(true);
    } else {
      alert("Please select a product to modify.");
    }
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      const confirmDelete = confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
        await deleteItem("products", selectedProduct.ProductID.toString());
        setSelectedProduct(null);
      }
    } else {
      alert("Please select a product to delete.");
    }
  };

  return (
    <div className="pt-20 pl-20 pr-6 pb-6 bg-gray-100 min-h-screen text-gray-800 space-y-6">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="space-x-2">
          <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Add</button>
          <button onClick={handleModify} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Modify</button>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>

      {/* Products Table */}
      <table className="w-full bg-white border text-left shadow rounded">
        <thead>
          <tr className="border-b bg-gray-200 text-gray-900 text-sm font-semibold">
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product, index) => (
            <tr
              key={index}
              onClick={() => setSelectedProduct(product)}
              className={`text-sm cursor-pointer ${selectedProduct?.ProductID === product.ProductID ? "bg-blue-100" : "hover:bg-gray-100"}`}
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{product.Name}</td>
              <td className="p-2">{product.Description}</td>
              <td className="p-2">{product.Category}</td>
              <td className="p-2">${product.Price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <ProductForm
              mode={formMode}
              initialData={formMode === "edit" ? selectedProduct : undefined}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
