import { Request, Response } from "express";
import { db } from "../db";

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Assume req.userId is available from Firebase Auth middleware
export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = req.userId;

  if (!title || !userId) {
    return res.status(400).json({ status: "error", message: "Title is required." });
  }

  try {
    const result = await db.query(
      "INSERT INTO tasks (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, userId]
    );

    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "DB insert failed" });
  }
};

export const getMyTasks = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const result = await db.query(
      "SELECT * FROM tasks WHERE owner_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json({ status: "success", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Error fetching tasks" });
  }
};

export const shareTask = async (req: Request, res: Response) => {
  const { id: taskId } = req.params;
  const { targetUserId } = req.body;
  const userId = req.userId;

  try {
    // Ensure the task belongs to this user
    const task = await db.query("SELECT * FROM tasks WHERE id = $1 AND owner_id = $2", [
      taskId,
      userId,
    ]);

    if (task.rowCount === 0) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }

    await db.query(
      "INSERT INTO task_shares (task_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [taskId, targetUserId]
    );

    res.json({ status: "success", message: "Task shared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Error sharing task" });
  }
};

export const getSharedTasks = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const result = await db.query(
      `SELECT t.* FROM tasks t
       INNER JOIN task_shares ts ON t.id = ts.task_id
       WHERE ts.user_id = $1
       ORDER BY t.created_at DESC`,
      [userId]
    );

    res.json({ status: "success", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to fetch shared tasks" });
  }
};

