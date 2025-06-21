import express from "express";
import dotenv from "dotenv";
import { db } from "./db";
import taskRoutes from "./routes/tasks";

dotenv.config();

const app = express(); // creates express application
app.use(express.json());

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
