import { Router } from "express";
import {
  addNewWork,
  deleteWork,
  getWorksByUserId,
} from "../controller/workController";

const router = Router();
router.get("/all/:uid", getWorksByUserId);
router.post("/create/:uid", addNewWork);
router.delete("/remove/:wid", deleteWork);

export default router;
