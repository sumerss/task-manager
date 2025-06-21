import express from "express";
import dotenv from "dotenv";
import { db } from "./db";
import taskRoutes from "./routes/tasks";
import { mockAuth } from "./middlewares/auth";

dotenv.config();

const app = express(); // creates express application
app.use(express.json());
app.use(mockAuth); // apply to all routes

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL -");

    // Only start server after DB connects
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("PostgreSQL connection error:", err);
    process.exit(1);
  });

app.use("/api/tasks", taskRoutes);
