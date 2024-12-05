import { Router } from "express";
import { signin, signup } from "../controllers/user.controller";

const router = Router();

router.route("/signup").post(signup as any);
router.route("/signin").post(signin as any);

export default router;
