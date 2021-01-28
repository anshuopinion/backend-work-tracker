import { addDay } from "../controller/dayController";
import { Router } from "express";

const router = Router();

router.get("/:wid", addDay);

export default router;
