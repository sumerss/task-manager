import React, { useState } from "react";

interface Props {
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

export const CreateTaskModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onCreate(title, description);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="text-sm px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button type="submit" className="text-sm px-4 py-2 bg-indigo-600 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
