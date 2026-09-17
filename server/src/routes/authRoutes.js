import { Router } from "express";
import {
  signup,
  login,
  refresh,
  logout,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));
router.post("/refresh", asyncHandler(refresh));
router.post("/logout", requireAuth, asyncHandler(logout));

export default router;
