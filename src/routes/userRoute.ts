import { Router } from "express";
import { userSignin, userSignup } from "../controller/userControllers";

const router = Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);

export default router;
