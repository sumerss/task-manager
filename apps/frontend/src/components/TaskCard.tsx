import React from "react";

interface TaskCardProps {
  title: string;
  description: string;
  createdAt: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ title, description, createdAt }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-gray-400">Created: {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};
