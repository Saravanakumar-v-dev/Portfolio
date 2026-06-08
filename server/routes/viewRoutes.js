import express from "express";
import {
  incrementViewCount,
  getViewCount,
} from "../controllers/viewCountController.js";

const router = express.Router();

// POST /api/views/increment — atomically increment + return new count
router.post("/increment", incrementViewCount);

// GET /api/views — read current count without incrementing
router.get("/", getViewCount);

export default router;
