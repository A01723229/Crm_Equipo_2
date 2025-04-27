import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";

interface TaskFormProps {
  mode: "add" | "edit";
  initialData?: {
    TaskID?: number;
    Title: string;
    Status: string;
    Priority: string;
    Description?: string;
    DeadLine?: string;
    Stage: string;
    DealID: number;
  };
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ mode, initialData, onClose }) => {
  const { addItem, modifyItem, data } = useData();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [stage, setStage] = useState("Requested");
  const [dealID, setDealID] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.Title);
      setStatus(initialData.Status);
      setPriority(initialData.Priority);
      setDescription(initialData.Description ?? "");
      setDeadLine(initialData.DeadLine ?? "");
      setStage(initialData.Stage);
      setDealID(String(initialData.DealID));
    }
  }, [mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dealID) {
      alert("Please select a deal before saving the task.");
      return;
    }

    setLoading(true);

    const payload = {
      Title: title,
      Status: status,
      Priority: priority,
      Description: description,
      DeadLine: deadLine,
      Stage: stage,
      DealID: Number(dealID),
    };

    if (mode === "add") {
      await addItem("tasks", payload);
    } else if (mode === "edit" && initialData?.TaskID) {
      await modifyItem("tasks", String(initialData.TaskID), payload);
    }

    setLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold text-gray-900">
        {mode === "add" ? "Add New Task" : "Edit Task"}
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded text-gray-900"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded text-gray-900">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border rounded text-gray-900">
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Stage */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Stage</label>
        <select value={stage} onChange={(e) => setStage(e.target.value)} className="w-full p-2 border rounded text-gray-900">
          <option value="Requested">Requested</option>
          <option value="Ready to Start">Ready to Start</option>
          <option value="Working">Working</option>
          <option value="Waiting">Waiting</option>
          <option value="Review">Review</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Deadline</label>
        <input
          type="date"
          value={deadLine}
          onChange={(e) => setDeadLine(e.target.value)}
          className="w-full p-2 border rounded text-gray-900"
        />
      </div>

      {/* Deal */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Deal</label>
        <select
          value={dealID ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setDealID(undefined);
            } else {
              setDealID(value);
            }
          }}
          className="w-full p-2 border rounded text-gray-900"
        >
          <option value="">Select a deal</option>
          {data?.allDeals.map((deal) => (
            <option key={deal.DealID} value={String(deal.DealID)}>
              {deal.ClientName} - ${deal.DealValue}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded text-gray-900"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : mode === "add" ? "Add Task" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
