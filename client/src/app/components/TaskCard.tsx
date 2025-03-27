// File: client/src/tasks/TaskCard.tsx

import React, { useState } from "react";

type Task = {
  id: number;
  title: string;
  priority: string;
  column: string;
};

type TaskCardProps = {
  task: Task;
  onMove: (id: number, direction: "left" | "right" | "up" | "down") => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onMove, onDelete, onEdit }) => {
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
    onEdit(task.id, editedTitle);
  };

  return (
    <div
      className="relative bg-white p-2 rounded shadow hover:shadow-lg transition group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full border rounded p-1 text-sm"
        />
      ) : (
        <div
          onDoubleClick={handleDoubleClick}
          className="text-sm font-bold cursor-pointer"
        >
          {task.title}
        </div>
      )}

      <div className="text-xs">Customer:</div>
      <div className="text-xs">Due Date:</div>
      <div className="text-xs">Deadline:</div>
      <div className="text-xs">Status:</div>

      {hovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto space-y-1 flex flex-col items-center">
            <button onClick={() => onMove(task.id, "up")} className="text-gray-600 text-lg hover:text-black">↑</button>
            <div className="flex space-x-2">
              <button onClick={() => onMove(task.id, "left")} className="text-gray-600 text-lg hover:text-black">←</button>
              <button onClick={() => onMove(task.id, "right")} className="text-gray-600 text-lg hover:text-black">→</button>
            </div>
            <button onClick={() => onMove(task.id, "down")} className="text-gray-600 text-lg hover:text-black">↓</button>
            <button onClick={() => onDelete(task.id)} className="text-red-500 text-sm font-bold mt-1">✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;