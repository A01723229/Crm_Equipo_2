'use client';
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useUser } from '../context/UserContext';
import LogInBox from '../components/loginBox';

const priorities = ["CRITICAL", "HIGH", "LOW"];
const columns = ["Requested", "Ready to Start", "Working", "Waiting", "Review", "Done"];

const KanbanBoard = () => {
  const { data, loading, error } = useData();
  const [expandedCardIds, setExpandedCardIds] = useState<string[]>([]);
  const { user } = useUser();
  const isUser = user?.isLogin;

  const normalize = (str: string) => str?.toLowerCase().replace(/\s+/g, "");

  const handleToggle = (id: string) => {
    setExpandedCardIds((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id]
    );
  };

  if (!isUser) return <LogInBox />;
  if (loading) return <div className="pt-20 pl-20 text-gray-600">Loading tasks...</div>;
  if (error || !data || !data.tasks) return <div className="pt-20 pl-20 text-red-500">{error || "Failed to load tasks."}</div>;

  return (
    <div className="pt-20 pl-20 pr-6 pb-6 bg-gray-100 min-h-screen">
      {/* Top Header Controls */}
      <div className="flex justify-end gap-2 mb-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Add</button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Modify</button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
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
              const tasks = data.tasks.filter(task =>
                normalize(task.Stage) === normalize(col) &&
                task.Priority?.toUpperCase() === priority
              );

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
                          className="border border-black text-xs p-2 rounded shadow hover:shadow-md cursor-pointer bg-gray-50 mb-2"
                          onClick={() => handleToggle(taskId)}
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
    </div>
  );
};

export default KanbanBoard;
