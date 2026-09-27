import { Router } from "express";
import { getRoute, geocode } from "../controllers/routeController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(getRoute));
router.get("/geocode", requireAuth, asyncHandler(geocode));

export default router;