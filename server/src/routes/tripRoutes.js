import { Router } from "express";
import {
  createTrip,
  listTrips,
  deleteTrip,
  toggleFavorite,
} from "../controllers/tripController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(requireAuth);
router.post("/", asyncHandler(createTrip));
router.get("/", asyncHandler(listTrips));
router.delete("/:id", asyncHandler(deleteTrip));
router.patch("/:id/favorite", asyncHandler(toggleFavorite));

export default router;
