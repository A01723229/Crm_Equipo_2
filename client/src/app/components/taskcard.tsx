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
      className="relative bg-white border border-gray-300 rounded p-3 shadow-sm hover:shadow-md transition text-xs"
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
          className="w-full border rounded p-1 text-sm mb-2"
        />
      ) : (
        <div
          onDoubleClick={handleDoubleClick}
          className="text-sm font-bold cursor-pointer mb-2"
        >
          {task.title}
        </div>
      )}

      <div className="space-y-1 text-[11px] text-gray-700">
        <div><span className="font-semibold">Customer:</span> [Name]</div>
        <div><span className="font-semibold">Due Date:</span> [Date]</div>
        <div><span className="font-semibold">Deadline:</span> [Date]</div>
        <div><span className="font-semibold">Status:</span> [Status]</div>
      </div>

      {hovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm rounded pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center space-y-1">
            <button onClick={() => onMove(task.id, "up")} className="hover:text-black text-gray-600">↑</button>
            <div className="flex space-x-2">
              <button onClick={() => onMove(task.id, "left")} className="hover:text-black text-gray-600">←</button>
              <button onClick={() => onMove(task.id, "right")} className="hover:text-black text-gray-600">→</button>
            </div>
            <button onClick={() => onMove(task.id, "down")} className="hover:text-black text-gray-600">↓</button>
            <button onClick={() => onDelete(task.id)} className="text-red-500 font-bold text-sm">✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
