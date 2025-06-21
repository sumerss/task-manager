import { Request, Response } from "express";
import { db } from "../db";

const tasks = [
  { id: 1, title: "Task 1", description: "Description for Task 1" },
  { id: 2, title: "Task 2", description: "Description for Task 2" },]

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
        data:tasks,
        status: "success",
    });
    // const result = await db.query("SELECT * FROM tasks");
    // res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
