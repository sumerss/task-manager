import React, { useState } from "react";
import { Login } from "./Login";
import { TaskDashboard } from "./pages/TaskDashboard";

function App() {
  const [token, setToken] = useState<string | null>(null);

  if (!token) return <Login onLogin={setToken} />;

  return <TaskDashboard token={token} />;
}

export default App;
