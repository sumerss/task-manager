import React, { useEffect, useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { CreateTaskModal } from "../components/CreateTaskModal";

interface Props {
  token: string;
}
interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export const TaskDashboard: React.FC<Props> = ({ token }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data.data || []);
  };

  const handleCreate = async (title: string, description: string) => {
    const res = await fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-800">My Tasks</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          + Create Task
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>

      {showModal && (
        <CreateTaskModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
      )}
    </div>
  );
};
