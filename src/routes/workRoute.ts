import { Router } from "express";
import { addNewWork } from "../controller/workController";

const router = Router();

router.post("/add-work/:uid", addNewWork);

export default router;
