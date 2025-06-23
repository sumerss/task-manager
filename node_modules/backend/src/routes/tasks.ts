import express from "express";
import {
  createTask,
  getMyTasks,
  shareTask,
  getSharedTasks,
} from "../controllers/tasks";

const router = express.Router();

router.post("/", createTask);
router.get("/", getMyTasks);
router.post("/:id/share", shareTask);
router.get("/shared", getSharedTasks);

export default router;
