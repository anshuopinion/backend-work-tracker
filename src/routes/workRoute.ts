import { Router } from "express";
import { addNewWork, getWorkByUserId } from "../controller/workController";

const router = Router();
router.get("/all/:uid", getWorkByUserId);
router.post("/create/:uid", addNewWork);

export default router;
