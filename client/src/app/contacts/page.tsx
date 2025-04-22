"use client";
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useUser } from '../context/UserContext';
import LogInBox from '../components/loginBox';
import ClientForm from '../components/crudforms/clientForm';

const CustomersPage = () => {
  const { data, loading: dataLoading, error, deleteItem } = useData();
  const { user, loading: userLoading } = useUser();
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");

  const isUser = user?.isLogin;

  if (userLoading || dataLoading) {
    console.log("Loading clients or user data...");
  }

  if (error || !data || !data.clientList) {
    console.log("Failed to load clients.");
  }

  if (!isUser) {
    return <LogInBox />;
  }

  const handleAdd = () => {
    setFormMode("add");
    setSelectedClient(null);
    setShowForm(true);
  };

  const handleModify = () => {
    if (selectedClient) {
      setFormMode("edit");
      setShowForm(true);
    } else {
      alert("Please select a client to modify.");
    }
  };

  const handleDelete = async () => {
    if (selectedClient) {
      const confirmDelete = confirm("Are you sure you want to delete this client?");
      if (confirmDelete) {
        await deleteItem("clients", selectedClient.ClientID.toString());
        setSelectedClient(null);
      }
    } else {
      alert("Please select a client to delete.");
    }
  };

  return (
    <div className="pt-20 pl-20 pr-6 pb-6 bg-gray-100 min-h-screen text-gray-800">
      {/* Top Header Controls */}
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
        <button onClick={handleModify} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
          Modify
        </button>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>

      {/* Clients Table */}
      <table className="w-full border text-left mb-6 bg-white shadow-md">
        <thead>
          <tr className="border-b font-bold text-sm bg-gray-200 text-gray-900">
            <th className="p-2">#</th>
            <th className="p-2">Client Name</th>
            <th className="p-2">Organization</th>
            <th className="p-2">Telephone</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {(data?.clientList ?? []).map((client, index) => (
            <tr
              key={index}
              onClick={() => setSelectedClient(client)}
              className={`cursor-pointer text-gray-800 ${selectedClient?.ClientID === client.ClientID ? "bg-blue-100" : "hover:bg-gray-100"}`}
            >
              <td className="p-2 font-medium">{index + 1}</td>
              <td className="p-2 font-medium">{client.ClientName}</td>
              <td className="p-2">{client.Company}</td>
              <td className="p-2">{client.Telephone}</td>
              <td className="p-2">{client.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Selected Client Detail */}
      {selectedClient && (
        <div className="border p-4 rounded shadow bg-white text-gray-800">
          <div className="flex justify-between mb-2">
            <h3 className="text-lg font-bold">
              Contact: {selectedClient.ClientName}
            </h3>
            <div className="space-x-2">
              <button onClick={handleModify} className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600">
                Modify
              </button>
              <button onClick={handleDelete} className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-2">
            <div>
              <strong>Telephone</strong>
              <br />
              {selectedClient.Telephone}
            </div>
            <div>
              <strong>Email</strong>
              <br />
              {selectedClient.Email}
            </div>
          </div>

          <div className="text-sm">
            <strong>{selectedClient.Company}</strong>
            <p className="text-gray-700">
              {selectedClient.Description || "No description."}
            </p>
          </div>
        </div>
      )}

      {/* Client Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <ClientForm
              mode={formMode}
              initialData={formMode === "edit" ? selectedClient : undefined}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
