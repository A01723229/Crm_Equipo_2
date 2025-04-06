"use client";
import React from "react";
import { useData } from "../context/DataContext";
import { useUser } from '../context/UserContext';
import LogInBox from '../components/loginBox';

const ProductsPage = () => {
  const { data, loading: dataLoading, error } = useData();
  const { user, loading: userLoading } = useUser();

  const isUser = user?.isLogin;

  if (userLoading || dataLoading) {
    return <div className="pt-20 pl-20 bg-gray-100 text-gray-600">Loading products...</div>;
  }

  if (!isUser) {
    return <LogInBox />;
  }

  if (error || !data || !data.products) {
    return (
      <div className="pt-20 pl-20 bg-gray-100 text-red-500">
        {error || "Failed to load products."}
      </div>
    );
  }

  return (
    <div className="pt-20 pl-20 pr-6 pb-6 bg-gray-100 min-h-screen text-gray-800 space-y-6">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="space-x-2">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Add</button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Modify</button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
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
          {data.products.map((product, index) => (
            <tr key={index} className="hover:bg-gray-100 text-sm">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{product.Name}</td>
              <td className="p-2">{product.Description}</td>
              <td className="p-2">{product.Category}</td>
              <td className="p-2">${product.Price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
