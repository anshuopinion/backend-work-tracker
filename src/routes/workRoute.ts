import { Router } from "express";
import {
  addNewWork,
  deleteWork,
  getWorkByUserId,
} from "../controller/workController";

const router = Router();
router.get("/all/:uid", getWorkByUserId);
router.post("/create/:uid", addNewWork);
router.delete("/remove/:wid", deleteWork);

export default router;
