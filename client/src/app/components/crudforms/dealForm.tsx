import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";

interface DealFormProps {
  mode: "add" | "edit";
  initialData?: {
    DealId?: number;
    DealValue: number;
    Comission: number;
    DeadLine: string;
    PaymentStatus: string;
    Description: string;
    ClientId: number;
  };
  onClose: () => void;
}

const DealForm: React.FC<DealFormProps> = ({ mode, initialData, onClose }) => {
  const { addItem, modifyItem, data } = useData();
  
  const [dealValue, setDealValue] = useState(0);
  const [comission, setComission] = useState(0);
  const [deadLine, setDeadLine] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [description, setDescription] = useState("");
  const [clientID, setClientID] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setDealValue(initialData.DealValue);
      setComission(initialData.Comission);
      setDeadLine(initialData.DeadLine);
      setPaymentStatus(initialData.PaymentStatus);
      setDescription(initialData.Description);
      setClientID(String(initialData.ClientId));
    }
  }, [mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientID || isNaN(Number(clientID))) {
      alert("Please select a valid client.");
      return;
    }

    const payload = {
      DealValue: dealValue,
      Comission: comission,
      DeadLine: deadLine,
      PaymentStatus: paymentStatus,
      Description: description,
      ClientID: Number(clientID),
    };

    console.log("Submitting payload:", payload);
    
    setLoading(true);

    try {
      if (mode === "add") {
        await addItem("deals", payload);
      } else if (mode === "edit" && initialData?.DealId) {
        await modifyItem("deals", String(initialData.DealId), payload);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting deal form:", error);
      alert("Failed to save deal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold text-gray-800">
        {mode === "add" ? "Add New Deal" : "Edit Deal"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Deal Value</label>
        <input
          type="number"
          value={dealValue}
          onChange={(e) => setDealValue(parseFloat(e.target.value))}
          step="0.01"
          min="0"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comission</label>
        <input
          type="number"
          value={comission}
          onChange={(e) => setComission(parseFloat(e.target.value))}
          step="0.01"
          min="0"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Deadline</label>
        <input
          type="date"
          value={deadLine}
          onChange={(e) => setDeadLine(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Status</label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Client</label>
        <select
          value={clientID ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setClientID(value === "" ? undefined : value);
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a client</option>
          {data?.clientList.map((client) => (
            <option key={client.ClientId} value={String(client.ClientId)}>
              {client.ClientName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : mode === "add" ? "Add Deal" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default DealForm;
