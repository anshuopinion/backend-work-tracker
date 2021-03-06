import { Router } from "express";

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

export default router;
