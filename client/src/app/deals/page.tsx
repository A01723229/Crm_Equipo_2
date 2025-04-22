"use client";
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useUser } from '../context/UserContext';
import LogInBox from '../components/loginBox';
import DealForm from '../components/crudforms/dealForm';

const DealsPage = () => {
  const { data, loading: dataLoading, error, deleteItem } = useData();
  const { user, loading: userLoading } = useUser();
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");

  const isUser = user?.isLogin;

  if (userLoading || dataLoading) {
    console.log('Loading deals or user...');
  }

  if (error || !data) {
    console.log('Failed to load deals data.');
  }

  if (!isUser) {
    return <LogInBox />;
  }

  const handleAdd = () => {
    setFormMode("add");
    setSelectedDeal(null);
    setShowForm(true);
  };

  const handleModify = () => {
    if (selectedDeal) {
      setFormMode("edit");
      setShowForm(true);
    } else {
      alert("Please select a deal to modify.");
    }
  };

  const handleDelete = async () => {
    if (selectedDeal) {
      const confirmDelete = confirm("Are you sure you want to delete this deal?");
      if (confirmDelete) {
        await deleteItem("deals", selectedDeal.DealID.toString());
        setSelectedDeal(null);
      }
    } else {
      alert("Please select a deal to delete.");
    }
  };

  return (
    <div className="pt-20 pl-20 pr-6 pb-6 bg-gray-100 min-h-screen text-gray-800 space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-sm font-semibold text-gray-500">Total Commissions</div>
          <div className="text-2xl font-bold text-green-600">
            ${data?.totalCommissions?.toLocaleString() ?? "0"}
          </div>
          <div className="text-xs text-gray-400">~based on closed deals</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-sm font-semibold text-gray-500">Commission Rate</div>
          <div className="text-2xl font-bold text-blue-600">
            {data?.commissionRate ?? 0}%
          </div>
        </div>
      </div>

      {/* All Deals */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">All Deals</h2>
          <div className="space-x-2">
            <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">Add</button>
            <button onClick={handleModify} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded">Modify</button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">Delete</button>
          </div>
        </div>

        <table className="w-full bg-white border text-left shadow rounded">
          <thead>
            <tr className="border-b bg-gray-200 text-gray-900 text-sm font-semibold">
              <th className="p-2">#</th>
              <th className="p-2">Client Name</th>
              <th className="p-2">Deal Value</th>
              <th className="p-2">Commission</th>
              <th className="p-2">Deal Date</th>
              <th className="p-2">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {(data?.allDeals ?? []).map((deal, index) => (
              <tr
                key={index}
                onClick={() => setSelectedDeal(deal)}
                className={`cursor-pointer text-sm ${selectedDeal?.DealID === deal.DealID ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{deal.ClientName}</td>
                <td className="p-2">{Number(deal.DealValue).toLocaleString()}</td>
                <td className="p-2">{Number(deal.Comission).toLocaleString()}</td>
                <td className="p-2">{new Date(deal.DealDate).toLocaleDateString()}</td>
                <td className="p-2">{deal.PaymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pending Payments */}
        <div className="bg-white p-4 rounded shadow">
          <div className="text-md font-semibold mb-2 flex items-center gap-2">
            <span>🚩</span> Pending Payments
          </div>
          <table className="w-full text-sm">
            <thead className="text-gray-600 font-semibold">
              <tr>
                <th className="p-1 text-left">Client Name</th>
                <th className="p-1 text-left">Commission</th>
                <th className="p-1 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {(data?.pendingPayments ?? []).map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-1">{item.ClientName}</td>
                  <td className="p-1">{item.Comission}</td>
                  <td className="p-1">{new Date(item.PaymentDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Commissions */}
        <div className="bg-white p-4 rounded shadow">
          <div className="text-md font-semibold mb-2 flex items-center gap-2">
            <span>✅</span> Top Commissions
          </div>
          <table className="w-full text-sm">
            <thead className="text-gray-600 font-semibold">
              <tr>
                <th className="p-1 text-left">Client Name</th>
                <th className="p-1 text-left">Commission</th>
              </tr>
            </thead>
            <tbody>
              {(data?.topCommissions ?? []).map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-1">{item.ClientName}</td>
                  <td className="p-1">{item.Comission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deal Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <DealForm
              mode={formMode}
              initialData={formMode === "edit" ? selectedDeal : undefined}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DealsPage;
