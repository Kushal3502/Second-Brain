import { Router } from "express";
import { signup } from "../controllers/user.controller";

const router = Router();

router.route("/signup").post(signup);

export default router;
