import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";

interface ClientFormProps {
  mode: "add" | "edit";
  initialData?: {
    ClientId?: number;
    ClientName: string;
    Company: string;
    Description: string;
    Telephone: string;
    Email: string;
  };
  onClose: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ mode, initialData, onClose }) => {
  const { addItem, modifyItem, data } = useData();

  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setClientName(initialData.ClientName);
      setCompany(initialData.Company);
      setDescription(initialData.Description);
      setTelephone(initialData.Telephone);
      setEmail(initialData.Email);
      setClientId(initialData.ClientId);
    }
  }, [mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ClientName: clientName,
      Company: company,
      Description: description,
      Telephone: telephone,
      Email: email,
      ClientId: clientId,
    };

    try {
      if (mode === "add") {
        await addItem("clients", payload);
      } else if (mode === "edit" && clientId !== undefined) {
        await modifyItem("clients", String(clientId), payload);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting client form:", error);
      alert("Failed to save client. Please try again.");
    }
  };

  if (!data || !Array.isArray(data.clientList)) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold text-gray-800">
        {mode === "add" ? "Add New Client" : "Edit Client"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
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
        <label className="block text-sm font-medium text-gray-700">Telephone</label>
        <input
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Client</label>
        <select
          value={clientId ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setClientId(value === "" ? undefined : Number(value));
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a client</option>
          {data.clientList.map((client) => (
            <option key={client.ClientId} value={client.ClientId}>
              {client.ClientName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {mode === "add" ? "Add Client" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
