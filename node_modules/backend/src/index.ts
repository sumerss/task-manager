import express from "express";
import dotenv from "dotenv";
import { db } from "./db";
import cors from "cors";
import taskRoutes from "./routes/tasks";
import { verifyFirebaseToken } from "./middlewares/auth";

dotenv.config();

const app = express(); // creates express application
app.use(express.json());
app.use(verifyFirebaseToken); // apply to all routes

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // optional if you're sending cookies or auth headers
}));

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL -");

    // Only start server after DB connects
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("PostgreSQL connection error:", err);
    process.exit(1);
  });

app.use("/api/tasks", taskRoutes);
