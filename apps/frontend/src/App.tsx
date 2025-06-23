import React, { useState } from "react";
import { Login } from "./Login";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTasks(data.data || []);
  };

  if (!token) return <Login onLogin={setToken} />;

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <button onClick={fetchTasks}>Fetch My Tasks</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
