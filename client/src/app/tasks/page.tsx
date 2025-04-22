'use client';
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useUser } from '../context/UserContext';
import LogInBox from '../components/loginBox';
import TaskForm from '../components/crudforms/taskForm';

const priorities = ["CRITICAL", "HIGH", "LOW"];
const columns = ["Requested", "Ready to Start", "Working", "Waiting", "Review", "Done"];

const KanbanBoard = () => {
  const { data, loading: dataLoading, error, deleteItem } = useData();
  const { user, loading: userLoading } = useUser();
  const [expandedCardIds, setExpandedCardIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const isUser = user?.isLogin;

  const normalize = (str: string) => str?.toLowerCase().replace(/\s+/g, '');

  const handleToggle = (id: string) => {
    setExpandedCardIds((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id]
    );
  };

  const handleAdd = () => {
    setFormMode("add");
    setSelectedTask(null);
    setShowForm(true);
  };

  const handleModify = () => {
    if (selectedTask) {
      setFormMode("edit");
      setShowForm(true);
    } else {
      alert("Please select a task to modify.");
    }
  };

  const handleDelete = async () => {
    if (selectedTask) {
      const confirmDelete = confirm("Are you sure you want to delete this task?");
      if (confirmDelete) {
        await deleteItem("tasks", selectedTask.TaskID.toString());
        setSelectedTask(null);
      }
    } else {
      alert("Please select a task to delete.");
    }
  };

  if (userLoading || dataLoading) {
    console.log('Loading user or data...');
  }

  if (error || !data || !data.tasks) {
    console.log('Failed to load tasks or no tasks available.');
  }

  if (!isUser) {
    return <LogInBox />;
  }

  return (
    <div className="pt-20 pl-20 pr-6 pb-6 bg-gray-100 min-h-screen">
      {/* Top Header Controls */}
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Add</button>
        <button onClick={handleModify} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Modify</button>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-6 text-center text-xs font-semibold text-black border border-black bg-white">
        {columns.map((col, idx) => (
          <div key={idx} className="p-2 border border-black">{col.toUpperCase()}</div>
        ))}
      </div>

      {/* Rows by Priority */}
      {priorities.map((priority, rowIdx) => (
        <div key={rowIdx} className="border border-black">
          {/* Priority Title */}
          <div className={`font-semibold text-sm px-2 py-1 border border-black ${
            rowIdx === 0 ? "bg-black text-white" :
            rowIdx === 1 ? "bg-gray-200 text-black" :
            "bg-gray-100 text-black"
          }`}>
            {priority === "CRITICAL" ? "CRITICAL" : priority === "HIGH" ? "HIGH PRIORITY" : "LOW PRIORITY"}
          </div>

          {/* Grid Row */}
          <div className="grid grid-cols-6 gap-0">
            {columns.map((col, colIdx) => {
              const tasks = data?.tasks?.filter(task =>
                normalize(task.Stage) === normalize(col) &&
                task.Priority?.toUpperCase() === priority
              ) || [];

              return (
                <div key={colIdx} className="bg-white border border-black min-h-[150px] p-2">
                  {tasks.length === 0 ? (
                    <div className="text-gray-400 italic text-center"></div>
                  ) : (
                    tasks.map((task) => {
                      const taskId = `${task.TaskID}`;
                      const isExpanded = expandedCardIds.includes(taskId);

                      return (
                        <div
                          key={taskId}
                          className={`border border-black text-xs p-2 rounded shadow hover:shadow-md cursor-pointer bg-gray-50 mb-2 ${selectedTask?.TaskID === task.TaskID ? "bg-blue-100" : ""}`}
                          onClick={() => {
                            handleToggle(taskId);
                            setSelectedTask(task);
                          }}
                        >
                          <div className="font-bold text-black mb-1">{task.Title}</div>
                          {isExpanded && (
                            <div className="text-gray-600 space-y-1 mt-2">
                              <div>Description: {task.Description || "-"}</div>
                              <div>Deadline: {task.DeadLine ? new Date(task.DeadLine).toLocaleDateString() : "-"}</div>
                              <div>Status: {task.Status}</div>
                              <div>Stage: {task.Stage}</div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <TaskForm
              mode={formMode}
              initialData={formMode === "edit" ? selectedTask : undefined}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;