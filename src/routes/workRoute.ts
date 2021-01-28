import { Router } from "express";
import {
  addTodo,
  getTodo,
  getTodoLists,
  removeTodo,
  updateTodo,
} from "../controller/todoController";
import {
  addNewWork,
  deleteWork,
  getWorkById,
  getWorksByUserId,
} from "../controller/workController";

const router = Router();
router.get("/:wid", getWorkById);
router.get("/all/:uid", getWorksByUserId);
router.post("/create/:uid", addNewWork);
router.delete("/remove/:wid", deleteWork);

// todo routes

router.get("/todos/:did", getTodoLists);
router.get("/todo/:tid", getTodo);
router.post("/todo/:wid", addTodo);
router.put("/todo/:tid", updateTodo);
router.delete("/todo/:tid", removeTodo);
export default router;
