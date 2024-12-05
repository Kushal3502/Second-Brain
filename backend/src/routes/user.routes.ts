import { Router } from "express";
import {
  checkAuth,
  logout,
  signin,
  signup,
} from "../controllers/user.controller";
import { validateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(signup as any);
router.route("/signin").post(signin as any);
router.route("/logout").post(validateJWT as any, logout as any);
router.route("/auth").get(validateJWT as any, checkAuth as any);

export default router;
