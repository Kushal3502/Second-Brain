import { Router } from "express";
import { validateJWT } from "../middlewares/auth.middleware";
import {
  createBrain,
  deleteBrain,
  getBrain,
  getUserBrains,
  updateBrain,
} from "../controllers/brain.controller";

const router = Router();

router.use(validateJWT as any);

router.route("/").post(createBrain as any);
router
  .route("/:id")
  .get(getBrain as any)
  .patch(updateBrain as any)
  .delete(deleteBrain as any);
router.route("/user/:userId").get(getUserBrains as any);

export default router;
