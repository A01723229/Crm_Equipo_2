// File: client/src/tasks/KanbanBoard.tsx

import React, { useState } from "react";
import TaskCard from "../components/TaskCard";

const priorities = ["CRITICAL", "HIGH PRIORITY", "LOW PRIORITY"];
const columns = ["REQUESTED", "READY TO START", "WORKING", "WAITING", "REVIEW", "DONE"];

type Direction = "left" | "right" | "up" | "down";
type Task = {
  id: number;
  title: string;
  priority: string;
  column: string;
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const moveTask = (id: number, direction: Direction) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== id) return task;

      const currentPriorityIndex = priorities.indexOf(task.priority);
      const currentColumnIndex = columns.indexOf(task.column);

      if (direction === "left" && currentColumnIndex > 0) {
        return { ...task, column: columns[currentColumnIndex - 1] };
      }
      if (direction === "right" && currentColumnIndex < columns.length - 1) {
        return { ...task, column: columns[currentColumnIndex + 1] };
      }
      if (direction === "up" && currentPriorityIndex > 0) {
        return { ...task, priority: priorities[currentPriorityIndex - 1] };
      }
      if (direction === "down" && currentPriorityIndex < priorities.length - 1) {
        return { ...task, priority: priorities[currentPriorityIndex + 1] };
      }

      return task;
    }));
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: "New Task",
      priority: "CRITICAL",
      column: "REQUESTED",
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id: number, newTitle: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  return (
    <div className="overflow-auto p-4">
      <div className="flex justify-end mb-4">
        <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 rounded">Add Task</button>
      </div>
      {priorities.map(priority => (
        <div key={priority} className="mb-4">
          <h2 className="text-xl font-bold bg-gray-200 px-2 py-1">{priority}</h2>
          <div className="grid grid-cols-6 gap-2">
            {columns.map(col => (
              <div key={col} className="min-h-[150px] bg-gray-100 p-2">
                <div className="font-bold border-b mb-2">{col}</div>
                {tasks.filter(task => task.priority === priority && task.column === col).map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onMove={moveTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;