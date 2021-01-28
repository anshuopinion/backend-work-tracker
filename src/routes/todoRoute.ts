import { Router } from "express";
import {
  addTodo,
  getTodo,
  getTodoLists,
  removeTodo,
  updateTodo,
} from "../controller/todoController";
const router = Router();

router.get("/todos/:did", getTodoLists);
router.get("/todo/:tid", getTodo);
router.post("/todo/:wid", addTodo);
router.put("/todo/:tid", updateTodo);
router.delete("/todo/:tid", removeTodo);

export default router;
